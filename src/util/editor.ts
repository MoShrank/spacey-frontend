import { Descendant, Node } from "slate";

export const deserialize = (text: string) => {
	let deserializedText: Descendant[];

	try {
		deserializedText = JSON.parse(text);
		if (!Array.isArray(deserializedText))
			throw Error("parsed text is not an array");
	} catch (e) {
		deserializedText = [
			{
				type: "paragraph",
				children: [{ text: text }],
				align: "left",
			},
		];
	}

	return deserializedText;
};

export const serialize = (nodes: Descendant[]) => {
	return JSON.stringify(nodes);
};

export const getPreview = (content: Descendant[] | string) => {
	if (typeof content === "string") {
		content = deserialize(content);
	}

	const nodes = content;
	const preview = nodes.map(node => Node.string(node)).join(" ");
	return preview;
};

export const isEmpty = (content: string) => {
	const nodes = deserialize(content);
	const preview = getPreview(nodes).replace(" ", "");
	return preview.length === 0;
};
