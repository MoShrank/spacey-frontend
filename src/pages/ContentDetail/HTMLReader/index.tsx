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
import useSelectionChange from "hooks/useSelectionChange";
import useStore from "hooks/useStore";
import parse, {
	DOMNode,
	HTMLReactParserOptions,
	domToReact,
} from "html-react-parser";
import { useEffect } from "react";
import { AnnotationI } from "types/content";
import { RangeDetailsI, deserialiseRange, serialiseRange } from "util/dom";

import style from "./style.module.scss";

interface HTMLReaderI {
	children?: string;
	onClickIMG: (src: string) => void;
	annotations: AnnotationI[];
	onAddAnnotation: (annotation: AnnotationI) => void;
	onDeleteAnnotation: (annotation: RangeDetailsI) => void;
}

const HTMLReader = ({
	annotations,
	onAddAnnotation,
	onDeleteAnnotation,
	children = "",
	onClickIMG,
}: HTMLReaderI) => {
	const setShowSearch = useStore(state => state.setShowSearch);

	const {
		state: contextMenuState,
		show,
		hide,
		calcContextMenuPosition,
		contextMenuRef,
	} = useContextMenu();

	const {
		selectedText,
		root: readerRootRef,
		highlight,
		select,
		isHighlighted,
		unhighlight,
	} = useHighlight();

	useEffect(() => {
		setShowSearch(false);
		return () => setShowSearch(true);
	}, []);

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
	}, [readerRootRef.current]);

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
		if (isHighlighted()) {
			const rangeToDelete = unhighlight();
			if (!rangeToDelete) return;
			onDeleteAnnotation(rangeToDelete);
		} else {
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
		}

		hide();
	};

	const showContextMenu = () => {
		const range = select();
		if (range && readerRootRef.current) {
			const pos = calcContextMenuPosition(range, readerRootRef.current);
			show(pos);
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
					{contextMenuState.visible && (
						<ContextMenuContainer
							x={contextMenuState.x}
							y={contextMenuState.y}
							ref={contextMenuRef}
						>
							<ContextMenuItem
								className={`${isHighlighted() && style.inverted_svg}`}
								onClick={handleAddSelection}
							>
								<HighlightIcon />
							</ContextMenuItem>
						</ContextMenuContainer>
					)}
				</div>
			</MathJax>
		</>
	);
};

export default HTMLReader;
