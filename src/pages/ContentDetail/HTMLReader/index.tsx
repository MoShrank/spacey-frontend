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

import style from "./style.module.scss";

interface HTMLReaderI {
	children?: string;
	onClickIMG: (src: string) => void;
}

const HTMLReader = ({ children = "", onClickIMG }: HTMLReaderI) => {
	const {
		state: contextMenuState,
		show,
		hide,
		contextMenuRef,
	} = useContextMenu();

	const { root: readerRootRef, highlight, select } = useHighlight();

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

	const handleSelectText = () => {
		highlight(style.highlight);
		hide();
	};

	const onMouseUp = (e: React.MouseEvent) => {
		if (select()) show(e);
	};

	return (
		<MathJax>
			<div
				ref={readerRootRef}
				onMouseUp={onMouseUp}
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
					<ContextMenuItem onClick={handleSelectText}>
						<HighlightIcon />
					</ContextMenuItem>
				</ContextMenuContainer>
			)}
		</MathJax>
	);
};

export default HTMLReader;
