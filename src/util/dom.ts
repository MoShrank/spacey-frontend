export const findNodeFromPath = (root: Node, path: string) => {
	const indexes = path
		.split("/")
		.filter((index: string) => index)
		.map((index: string) => parseInt(index));
	let node = root;
	for (const index of indexes) {
		const childNodes = (node as ChildNode).childNodes;
		node = childNodes[index];
	}
	return node;
};

export const generatePathForNode = (root: Node, targetNode: Node) => {
	let path = "";

	let node = targetNode;
	while (node !== root) {
		const parent = node.parentNode;
		if (!parent) break;

		const index = Array.from(parent.childNodes).indexOf(node as ChildNode);
		path = `${index}/${path}`;
		node = parent;
	}

	return path;
};

export interface RangeDetailsI {
	startPath: string;
	endPath: string;
	startOffset: number;
	endOffset: number;
}

export const serialiseRange = (root: Node, range: Range): RangeDetailsI => {
	const startPath = generatePathForNode(root, range.startContainer);
	const endPath = generatePathForNode(root, range.endContainer);

	return {
		startPath,
		endPath,
		startOffset: range.startOffset,
		endOffset: range.endOffset,
	};
};

export const deserialiseRange = (root: Node, range: RangeDetailsI) => {
	const startNode = findNodeFromPath(root, range.startPath);
	const endNode = findNodeFromPath(root, range.endPath);

	const newRange = new Range();
	newRange.setStart(startNode, range.startOffset);
	newRange.setEnd(endNode, range.endOffset);

	return newRange;
};
