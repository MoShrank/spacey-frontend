import {
	TextHighlight,
	useHighlightContainerContext,
} from "react-pdf-highlighter-extended";

const MyHighlightContainer = () => {
	const { highlight, isScrolledTo } = useHighlightContainerContext();
	const isTextHighlight = !(highlight.content && highlight.content.image);

	const component = isTextHighlight ? (
		<TextHighlight isScrolledTo={isScrolledTo} highlight={highlight} />
	) : null;

	return component;
};

export default MyHighlightContainer;
