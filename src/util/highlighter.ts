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
	private defaultRegistry: string;
	private defaultPriority: number;

	constructor(relativeRoot: HTMLElement) {
		this.rangeMapping = new Map();
		this.relativeRoot = relativeRoot;
		this.defaultRegistry = "text-highlight";
		this.defaultPriority = 1;
	}

	private getOrCreateHighlight(
		registry: string,
		priority: number = this.defaultPriority,
	) {
		// eslint-disable-next-line
		// @ts-ignore
		if (!CSS.highlights.has(registry)) {
			const highlight = new Highlight();
			// eslint-disable-next-line
			// @ts-ignore
			highlight.priority = priority;
			// eslint-disable-next-line
			// @ts-ignore
			CSS.highlights.set(registry, highlight);
		}
		// eslint-disable-next-line
		// @ts-ignore
		return CSS.highlights.get(registry);
	}

	private rangeDetailsToString(rangeDetails: RangeDetailsI, registry: string) {
		return `${rangeDetails.startPath}-${rangeDetails.endPath}-${rangeDetails.startOffset}-${rangeDetails.endOffset}-${registry}`;
	}

	private rangeToString(range: Range, registry: string) {
		const serializedRange = serialiseRange(this.relativeRoot, range);

		return this.rangeDetailsToString(serializedRange, registry);
	}

	public add(
		range: Range,
		registry: string = this.defaultRegistry,
		priority: number = this.defaultPriority,
	) {
		if (this.has(range, registry)) return;
		const serializedRange = this.rangeToString(range, registry);
		this.rangeMapping.set(serializedRange, range);

		const highlights = this.getOrCreateHighlight(registry, priority);
		highlights.add(range);
	}

	public has(range: Range, registry: string = this.defaultRegistry) {
		const serializedRange = this.rangeToString(range, registry);
		const originalRange = this.rangeMapping.get(serializedRange);
		if (!originalRange) return false;

		const highlights = this.getOrCreateHighlight(registry);
		return highlights.has(originalRange);
	}

	public delete(
		range?: Range,
		registry: string = this.defaultRegistry,
	): RangeDetailsI | undefined {
		if (!range) {
			// eslint-disable-next-line
			// @ts-ignore
			CSS.highlights.delete(registry);
			return;
		}

		const serializedRange = this.rangeToString(range, registry);

		const originalRange = this.rangeMapping.get(serializedRange);

		if (!originalRange) return;

		this.rangeMapping.delete(serializedRange);

		const highlights = this.getOrCreateHighlight(registry);
		highlights.delete(originalRange);

		return serialiseRange(this.relativeRoot, originalRange);
	}
}

export default Highlighter;
