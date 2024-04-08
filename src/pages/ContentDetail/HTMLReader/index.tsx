import { ReactComponent as HighlightIcon } from "assets/icons/highlight.svg";
import MathJax from "better-react-mathjax/MathJax";
import {
	ContextMenuContainer,
	ContextMenuItem,
	useContextMenu,
	useHighlight,
} from "components/ContextMenu";
import Header from "components/Header";
import Text from "components/Text";
import useMediaQuery from "hooks/useMediaQuery";
import useSelectionChange from "hooks/useSelectionChange";
import parse, {
	DOMNode,
	HTMLReactParserOptions,
	domToReact,
} from "html-react-parser";
import { useEffect } from "react";
import { AnnotationI } from "types/content";
import { deserialiseRange, serialiseRange } from "util/dom";

import style from "./style.module.scss";

interface HTMLReaderI {
	children?: string;
	onClickIMG: (src: string) => void;
	annotations: AnnotationI[];
	onAddAnnotation: (annotation: AnnotationI) => void;
}

const HTMLReader = ({
	annotations,
	onAddAnnotation,
	children = "",
	onClickIMG,
}: HTMLReaderI) => {
	const {
		state: contextMenuState,
		show,
		hide,
		contextMenuRef,
	} = useContextMenu();

	const {
		selectedText,
		root: readerRootRef,
		highlight,
		select,
	} = useHighlight();

	useEffect(() => {
		if (!readerRootRef.current) return;
		for (const annotation of annotations) {
			const {
				start_path: startPath,
				end_path: endPath,
				start_offset: startOffset,
				end_offset: endOffset,
			} = annotation;

			const range = deserialiseRange(readerRootRef.current, {
				startPath,
				endPath,
				startOffset,
				endOffset,
			});

			highlight(range);
		}
	}, [annotations, readerRootRef.current]);

	const options: HTMLReactParserOptions = {
		replace(domNode: DOMNode) {
			if (domNode.type !== "tag") return;

			if (domNode.name === "p") {
				return (
					<Text style={{ marginTop: "12px", marginBottom: "12px" }}>
						{domToReact(domNode.children as DOMNode[], options)}
					</Text>
				);
			} else if (domNode.name === "img") {
				const attribs = domNode.attribs;
				if (attribs.srcset) {
					attribs.srcSet = attribs.srcset;
					delete attribs.srcset;
				}

				const newAttributes = {
					...attribs,
					className: style.img,
					onClick: (e: React.MouseEvent<HTMLImageElement>) => {
						e.preventDefault();
						onClickIMG(domNode.attribs.src);
					},
				};
				return <img {...newAttributes} />;
			} else if (domNode.name.match(/h[1-3]/)) {
				const headerLevel = domNode.name[1] as "1" | "2" | "3";
				return (
					<Header className={style[`h${headerLevel}`]} kind={`h${headerLevel}`}>
						{domToReact(domNode.children as DOMNode[], options)}
					</Header>
				);
			} else if (domNode.name === "a") {
				const newAttributes = {
					...domNode.attribs,
					target: "_blank",
					rel: "noopener noreferrer",
				};
				return (
					<a {...newAttributes}>
						{domToReact(domNode.children as DOMNode[], options)}
					</a>
				);
			}
		},
	};

	const parsedText = parse(children, options);

	const handleAddSelection = () => {
		const newAnnotationRange = highlight();

		if (!newAnnotationRange || !selectedText || !readerRootRef.current) return;

		const { startPath, endPath, startOffset, endOffset } = serialiseRange(
			readerRootRef.current as Node,
			newAnnotationRange,
		);
		const newAnnotation = {
			start_path: startPath,
			end_path: endPath,
			start_offset: startOffset,
			end_offset: endOffset,
			text: selectedText,
			color: "default",
		};

		onAddAnnotation(newAnnotation);
		hide();
	};

	const isMobile = useMediaQuery("(max-width: 500px)");

	const showContextMenu = () => {
		const range = select();
		if (range && readerRootRef.current) {
			const rect = range.getBoundingClientRect();

			// show context menu above and in the
			// middle of the selected text
			const contextMenuHeight = 40;
			const noContextMenuItems = 1;
			const contextMenuWidth =
				40 * noContextMenuItems + 1 * (noContextMenuItems - 1); // 40px per item + 1px border between items

			const x = rect.x + rect.width / 2 - contextMenuWidth / 2;
			let y = rect.y - contextMenuHeight / 2;

			if (isMobile) {
				y = rect.y + rect.height + 5;
			} else {
				y = rect.y - contextMenuHeight - 5;
			}

			show(undefined, x, y);
		}
	};

	useSelectionChange(() => {
		showContextMenu();
	}, readerRootRef);

	return (
		<>
			<MathJax>
				<div ref={readerRootRef} className={style.readability_content}>
					{parsedText}
				</div>
			</MathJax>
			{contextMenuState.visible && (
				<ContextMenuContainer
					x={contextMenuState.x}
					y={contextMenuState.y}
					ref={contextMenuRef}
				>
					<ContextMenuItem onClick={handleAddSelection}>
						<HighlightIcon />
					</ContextMenuItem>
				</ContextMenuContainer>
			)}
		</>
	);
};

export default HTMLReader;
