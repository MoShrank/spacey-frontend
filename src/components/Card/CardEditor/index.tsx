import { ReactComponent as AlignCenterIcon } from "assets/icons/format_align_center.svg";
import { ReactComponent as AlignLeftIcon } from "assets/icons/format_align_left.svg";
import { ReactComponent as AlignRightIcon } from "assets/icons/format_align_right.svg";
import { ReactComponent as BoldIcon } from "assets/icons/format_bold.svg";
import { ReactComponent as ItalicIcon } from "assets/icons/format_italic.svg";
import { ReactComponent as ListBulletedIcon } from "assets/icons/format_list_bulleted.svg";
import { ReactComponent as UnderlinedIcon } from "assets/icons/format_underlined.svg";
import { ReactComponent as LatexLogo } from "assets/icons/latex_logo.svg";
import Text from "components/Text";
import { useCallback, useMemo, useState } from "react";
import {
	BaseEditor,
	Descendant,
	Editor,
	Path,
	Range,
	Element as SlateElement,
	Transforms,
	createEditor,
} from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { combineStyles } from "util/css";
import { deserialize } from "util/editor";

import MathElement from "./MathElement";
import { convertMathToText, isMathBlockActive } from "./MathElement/helper";
import style from "./style.module.scss";
import { CustomElement, CustomText } from "./types";

declare module "slate" {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

const Toolbar = ({
	children,
	color,
}: {
	children?: React.ReactNode;
	color: string;
}) => (
	<div
		style={{ backgroundColor: color }}
		onClick={e => e.stopPropagation()}
		className={style.toolbar}
	>
		{children}
	</div>
);

interface ToolbarButtonI {
	format: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	editor: Editor;
	isActive: boolean;
}

const isMarkActive = (editor: Editor, format: string) => {
	const marks = Editor.marks(editor);
	/*eslint-disable */
	// @ts-ignore
	return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isBlockActive = (editor: Editor, format: string, blockType = "type") => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: n =>
				/*eslint-disable */
				// @ts-ignore
				!Editor.isEditor(n) && SlateElement.isElement(n) && n[blockType] === format,
		}),
	);

	return !!match;
};

const toggleBlock = (editor: Editor, format: string) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
	);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: n =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: Partial<SlateElement>;
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : (format as "left" | "center" | "right"),
		};
	} else {
		newProperties = {
			type: isActive ? "paragraph" : isList ? "list-item" : format,
		};
	}
	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const MarkButton = ({ editor, format, Icon, isActive }: ToolbarButtonI) => {
	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		toggleMark(editor, format);
	};

	return (
		<button
			className={combineStyles(
				style.toolbar_block,
				isActive ? style.active : undefined,
			)}
			onClick={e => e.preventDefault()}
			onMouseDown={onClick}
		>
			<Icon />
		</button>
	);
};

const BlockButton = ({ format, Icon, editor, isActive }: ToolbarButtonI) => {
	const onClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		toggleBlock(editor, format);
	};

	return (
		<button
			className={combineStyles(
				style.toolbar_block,
				isActive ? style.active : undefined,
			)}
			onClick={e => e.preventDefault()}
			onMouseDown={onClick}
		>
			<Icon />
		</button>
	);
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

interface TextEditorI {
	question: string;
	answer: string;
	setQuestion: (question: string) => void;
	setAnswer: (answer: string) => void;
	readOnly: boolean;
	toolbarColor: string;
	hideAnswer?: boolean;
	onClickShowAnswer?: () => void;
}

const insertNewBlockBelowMath = (editor: Editor) => {
	if (!editor.selection) return;

	const [node, path] = Editor.node(editor, editor.selection, { depth: 1 });

	if (!path) return;

	const newPath = Path.next(path);

	Transforms.insertNodes(
		editor,
		{
			type: "paragraph", // or the default type of your block
			children: [{ text: "" }],
		},
		{ at: newPath },
	);
	Transforms.select(editor, newPath);
};

const handleDelete = (event: any, editor: Editor) => {
	const { selection } = editor;
	if (selection && Range.isCollapsed(selection)) {
		const [match] = Editor.nodes(editor, {
			at: Editor.before(editor, selection, { unit: "block" }),
			/*eslint-disable */
			// @ts-ignore
			match: n => n.type === "math",
		});

		if (match) {
			event.preventDefault(); // Prevent the default delete behavior
			convertMathToText(editor, match[0]); // Your function to convert math block to text
		}
	}
};

const CardEditor = ({
	question,
	answer,
	setQuestion,
	setAnswer,
	readOnly,
	toolbarColor,
	hideAnswer = false,
	onClickShowAnswer,
}: TextEditorI) => {
	const [activeEditor, setActiveEditor] = useState<number | undefined>(
		undefined,
	);

	const editorOne = useMemo(() => withReact(createEditor()), []);
	const editorTwo = useMemo(() => withReact(createEditor()), []);

	const editor = activeEditor == 0 ? editorOne : editorTwo;

	editorOne.isVoid = (element: any) => {
		return element.type === "math" ? true : false;
	};

	editorTwo.isVoid = (element: any) => {
		return element.type === "math" ? true : false;
	};

	const renderElement = useCallback(
		props => <Element {...props} editor={editor} />,
		[editor],
	);
	const renderLeaf = useCallback(props => <Leaf {...props} />, []);

	const questionParsed = deserialize(question);
	const answerParsed = deserialize(answer);

	const questionChange = (value: Descendant[]) => {
		setActiveItems(getActiveItems());
		const isAstChange = editorOne.operations.some(
			op => "set_selection" !== op.type,
		);
		if (isAstChange) {
			const content = JSON.stringify(value);
			setQuestion(content);
		}
	};

	const answerChange = (value: Descendant[]) => {
		setActiveItems(getActiveItems());
		const isAstChange = editorTwo.operations.some(
			op => "set_selection" !== op.type,
		);
		if (isAstChange) {
			const content = JSON.stringify(value);
			setAnswer(content);
		}
	};

	const getActiveItems = () => {
		return {
			marks: {
				bold: isMarkActive(editor, "bold"),
				italic: isMarkActive(editor, "italic"),
				underline: isMarkActive(editor, "underline"),
			},
			blocks: {
				bulletedList: isBlockActive(
					editor,
					"bulleted-list",
					TEXT_ALIGN_TYPES.includes("bulleted-list") ? "align" : "type",
				),
				numberedList: isBlockActive(
					editor,
					"numbered-list",
					TEXT_ALIGN_TYPES.includes("numbered-list") ? "align" : "type",
				),
				left: isBlockActive(
					editor,
					"left",
					TEXT_ALIGN_TYPES.includes("left") ? "align" : "type",
				),
				center: isBlockActive(
					editor,
					"center",
					TEXT_ALIGN_TYPES.includes("center") ? "align" : "type",
				),
				right: isBlockActive(
					editor,
					"right",
					TEXT_ALIGN_TYPES.includes("right") ? "align" : "type",
				),
				math: isBlockActive(editor, "math", "type"),
			},
		};
	};

	const [activeItems, setActiveItems] = useState(getActiveItems());

	const setEditor = (editor: number | undefined) => {
		setActiveEditor(editor);
		setActiveItems(getActiveItems());
	};

	const handleKeyDown = (event: any, editor: any) => {
		if (event.key === "Enter" && isMathBlockActive(editor)) {
			event.preventDefault();
			event.stopPropagation();
			insertNewBlockBelowMath(editor);
		}
		if (event.key === "Backspace") {
			handleDelete(event, editor);
		}
	};

	return (
		<>
			{!readOnly && (
				<Toolbar color={toolbarColor}>
					<MarkButton
						isActive={activeItems.marks.bold}
						editor={editor}
						Icon={BoldIcon}
						format="bold"
					/>
					<MarkButton
						isActive={activeItems.marks.italic}
						editor={editor}
						Icon={ItalicIcon}
						format="italic"
					/>
					<MarkButton
						isActive={activeItems.marks.underline}
						editor={editor}
						Icon={UnderlinedIcon}
						format="underline"
					/>
					<BlockButton
						isActive={activeItems.blocks.bulletedList}
						editor={editor}
						format="bulleted-list"
						Icon={ListBulletedIcon}
					/>
					<span className={style.align_container}>
						<BlockButton
							isActive={activeItems.blocks.left}
							editor={editor}
							format="left"
							Icon={AlignLeftIcon}
						/>
						<BlockButton
							isActive={activeItems.blocks.center}
							editor={editor}
							format="center"
							Icon={AlignCenterIcon}
						/>
						<BlockButton
							isActive={activeItems.blocks.right}
							editor={editor}
							format="right"
							Icon={AlignRightIcon}
						/>
					</span>
					<BlockButton
						isActive={activeItems.blocks.math}
						editor={editor}
						format="math"
						Icon={LatexLogo}
					/>
				</Toolbar>
			)}
			<Slate
				editor={editorOne}
				initialValue={questionParsed}
				onChange={questionChange}
			>
				<Editable
					readOnly={readOnly}
					onFocus={() => setEditor(0)}
					//onBlur={() => setEditor(undefined)}
					style={{ gridArea: "question" }}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					placeholder="question"
					id="question"
					className={combineStyles(style.input, style.question)}
					onKeyDown={e => handleKeyDown(e, editor)}
				/>
			</Slate>

			{hideAnswer ? (
				<div className={style.text_container} onClick={onClickShowAnswer}>
					<Text color="grey" className={style.text}>
						Click here or use the button to show answer
					</Text>
				</div>
			) : (
				<Slate
					editor={editorTwo}
					initialValue={answerParsed}
					onChange={answerChange}
				>
					<Editable
						readOnly={readOnly}
						onFocus={() => setEditor(1)}
						//onBlur={() => setEditor(undefined)}
						style={{ gridArea: "answer" }}
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						placeholder="answer"
						className={combineStyles(style.input, style.answer)}
						onKeyDown={e => handleKeyDown(e, editor)}
					/>
				</Slate>
			)}
		</>
	);
};

interface ElementI {
	attributes: Record<string, unknown>;
	children: React.ReactNode;
	element: CustomElement;
	editor: Editor;
}

const Element = ({ attributes, children, element, editor }: ElementI) => {
	const style = { textAlign: element.align || "left" };
	switch (element.type) {
		case "block-quote":
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case "bulleted-list":
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case "heading-one":
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case "heading-two":
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case "list-item":
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case "numbered-list":
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		case "math":
			return (
				<MathElement element={element} attributes={attributes}>
					{children}
				</MathElement>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

interface LeafI {
	attributes: Record<string, unknown>;
	children: React.ReactNode;
	leaf: CustomText;
}

const Leaf = ({ attributes, children, leaf }: LeafI) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}
	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

export default CardEditor;
