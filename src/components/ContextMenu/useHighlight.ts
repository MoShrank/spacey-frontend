import { useCallback, useRef, useState } from "react";

const highlightRange = (range: Range, className: string) => {
	const startContainer = range.startContainer;
	const endContainer = range.endContainer;
	const parent = startContainer.parentNode;

	if (
		!startContainer ||
		!endContainer ||
		startContainer.nodeType !== Node.TEXT_NODE ||
		!parent ||
		parent.nodeName === "MARK" ||
		!startContainer.nodeValue
	)
		return;

	const mark = document.createElement("mark");
	mark.className = className;
	range.surroundContents(mark);
};

const highlighSelection = (
	range: Range | null,
	root: Node,
	className: string,
) => {
	if (!root || !range) return;

	// if the selection is within the same node we can just highlight the range
	// otherwise we want to highlight each text node individually.
	// This is done by first highlighting the start and end of the range.
	// After that we want to highlight everything inbetween.
	// We can do this by recursively traversing through all the nodes
	// within our root node and highlight a node if its between
	// (past the start & before the end node respectively).
	// A few more conditions for highlighting apply:
	// - we only want to highlight text nodes
	// - we dont want to highlight a next node if its parent is already highlighted

	if (range.startContainer === range.endContainer) {
		highlightRange(range, className);
	} else {
		const startRange = range.cloneRange();
		const startContainerLength = range.startContainer.textContent?.length;
		if (!startContainerLength) return;
		startRange.setEnd(range.startContainer, startContainerLength);
		highlightRange(startRange, className);

		const endRange = range.cloneRange();
		endRange.setStart(range.endContainer, 0);
		highlightRange(endRange, className);

		let pastStartNode = false;
		let reachedEndNode = false;

		const highlight = (node: Node) => {
			if (node === range.startContainer) {
				pastStartNode = true;
			} else if (node === range.endContainer) {
				reachedEndNode = true;
			} else if (
				pastStartNode &&
				!reachedEndNode &&
				node.nodeType === Node.TEXT_NODE
			) {
				const range = new Range();
				range.selectNodeContents(node);
				highlightRange(range, className);
			} else {
				const children = Array.from(node.childNodes);
				let idx = 0;
				while (idx < children.length && !reachedEndNode) {
					highlight(children[idx]);
					idx++;
				}
			}
		};

		const rootNode = range.commonAncestorContainer;
		highlight(rootNode);
	}
};

const useHighlight = () => {
	const root = useRef<HTMLDivElement>(null);
	const [selectedRange, setSelectedRange] = useState<Range | null>(null);

	const highlight = useCallback(
		(className: string, range?: Range) => {
			if (!root.current) return;

			if (range) {
				highlighSelection(range, root.current, className);
				return range;
			}

			if (!selectedRange) return;
			highlighSelection(selectedRange, root.current, className);

			return selectedRange;
		},
		[selectedRange, root.current],
	);

	const select = useCallback(() => {
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed || !root.current) return;
		const range = selection.getRangeAt(0);
		setSelectedRange(range.cloneRange());

		return range;
	}, [root.current]);

	return {
		root,
		highlight,
		select,
	};
};

export default useHighlight;
