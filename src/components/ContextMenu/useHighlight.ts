import { useEffect, useRef, useState } from "react";
import Highlighter from "util/highlighter";

const useHighlight = () => {
	const root = useRef<HTMLDivElement>(null);
	const [selectedRange, setSelectedRange] = useState<Range | null>(null);
	const [selectedText, setSelectedText] = useState<string | null>(null);
	const highlightRef = useRef<Highlighter>();

	useEffect(() => {
		if (root.current && !highlightRef.current) {
			highlightRef.current = new Highlighter(root.current);
		}
	}, [root.current]);

	const isHighlighted = (range?: Range) => {
		const rangeToCheck = range || selectedRange;
		if (!rangeToCheck || !highlightRef.current) return false;
		return highlightRef.current.has(rangeToCheck) || false;
	};

	const highlight = (
		range?: Range,
		cssSelector?: string | undefined,
		priority?: number,
	) => {
		const rangeToHighlight = range || selectedRange;

		if (!root.current || !rangeToHighlight || !highlightRef.current) return;

		highlightRef.current.add(rangeToHighlight, cssSelector, priority);
		return rangeToHighlight;
	};

	const unhighlight = (
		range?: Range,
		cssSelector?: string | undefined,
		deleteAll?: boolean,
	) => {
		let rangeToUnhighlight;
		if (deleteAll) rangeToUnhighlight = undefined;
		else rangeToUnhighlight = range || selectedRange;

		if (!root.current || !highlightRef.current || rangeToUnhighlight === null)
			return;

		const deletedRange = highlightRef.current.delete(
			rangeToUnhighlight,
			cssSelector,
		);

		return deletedRange;
	};

	const select = () => {
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed || !root.current) return;

		const range = selection.getRangeAt(0);
		const newRange = range.cloneRange();

		setSelectedRange(newRange);
		setSelectedText(range.toString());

		return newRange;
	};

	return {
		root,
		selectedText,
		highlight,
		unhighlight,
		select,
		isHighlighted,
	};
};

export default useHighlight;
