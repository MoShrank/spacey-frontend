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

	const onContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
		console.log(e.nativeEvent);
		console.log(e);
		if (
			"pointerType" in e.nativeEvent &&
			// eslint-disable-next-line
			// @ts-ignore
			e.nativeEvent.pointerType === "touch" &&
			select()
		)
			show(e);
	};

	const onMouseUp = (e: React.MouseEvent) => {
		if (select()) show(e);
	};

	return (
		<MathJax>
			<div
				ref={readerRootRef}
				onMouseUp={onMouseUp}
				onContextMenu={onContextMenu}
				className={style.readability_content}
			>
				{parsedText}
			</div>
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
		</MathJax>
	);
};

export default HTMLReader;
