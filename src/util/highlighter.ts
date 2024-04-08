import { RangeDetailsI, serialiseRange } from "./dom";

declare class Highlight {
	constructor(...range: Range[]);

	add(range: Range): void;
	has(range: Range): boolean;
	keys(): string[];
	delete(range: Range): void;
}

class Highlighter {
	private rangeMapping: Map<string, Range>;
	private relativeRoot: HTMLElement;
	private highlights: Highlight;

	constructor(relativeRoot: HTMLElement) {
		this.rangeMapping = new Map();
		this.relativeRoot = relativeRoot;
		this.highlights = new Highlight();

		// eslint-disable-next-line
		// @ts-ignore
		CSS.highlights.set("text-highlight", this.highlights);
	}

	private rangeDetailsToString(rangeDetails: RangeDetailsI) {
		return `${rangeDetails.startPath}-${rangeDetails.endPath}-${rangeDetails.startOffset}-${rangeDetails.endOffset}`;
	}

	public add(range: Range) {
		if (this.has(range)) return;

		const serializedRange = serialiseRange(this.relativeRoot, range);
		this.rangeMapping.set(this.rangeDetailsToString(serializedRange), range);
		this.highlights.add(range);
	}

	public has(range: Range) {
		const serializedRange = serialiseRange(this.relativeRoot, range);

		const originalRange = this.rangeMapping.get(
			this.rangeDetailsToString(serializedRange),
		);

		if (!originalRange) return false;

		return this.highlights.has(originalRange);
	}

	public delete(range: Range): RangeDetailsI | undefined {
		const serializedRange = serialiseRange(this.relativeRoot, range);
		const originalRange = this.rangeMapping.get(
			this.rangeDetailsToString(serializedRange),
		);

		if (!originalRange) return;

		this.rangeMapping.delete(this.rangeDetailsToString(serializedRange));
		this.highlights.delete(originalRange);

		return serializedRange;
	}
}

export default Highlighter;
