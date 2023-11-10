import { Editor, Node, Element as SlateElement, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const isMathBlockActive = (editor: Editor) => {
	const [match] = Editor.nodes(editor, {
		match: n =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "math",
	});
	return !!match;
};

export const convertMathToText = (editor: Editor, mathNode: Node) => {
	const path = ReactEditor.findPath(editor, mathNode);
	/*eslint-disable */
	// @ts-ignore
	const newText = mathNode.children[0].text;

	Transforms.removeNodes(editor, { at: path });
	Transforms.insertNodes(
		editor,
		{
			type: "paragraph",
			children: [{ text: newText }],
		},
		{ at: path },
	);
};
