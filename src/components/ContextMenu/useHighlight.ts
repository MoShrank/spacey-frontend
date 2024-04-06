import { useRef, useState } from "react";

declare class Highlight {
	constructor(...range: Range[]);

	add(range: Range): void;
}

const useHighlight = () => {
	const root = useRef<HTMLDivElement>(null);
	const [selectedRange, setSelectedRange] = useState<Range | null>(null);
	const [selectedText, setSelectedText] = useState<string | null>(null);

	const [highlights] = useState<Highlight>(new Highlight());
	// eslint-disable-next-line
	// @ts-ignore
	CSS.highlights.set("text-highlight", highlights);

	const highlight = (range?: Range) => {
		const rangeToHighlight = range || selectedRange;

		if (!root.current || !rangeToHighlight) return;

		highlights.add(rangeToHighlight);

		return rangeToHighlight;
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
		select,
	};
};

export default useHighlight;
