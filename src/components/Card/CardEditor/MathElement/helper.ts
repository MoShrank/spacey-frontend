import { Editor, Element as SlateElement, Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { CustomElement } from "../types";

export const isMathBlockActive = (editor: Editor) => {
	const [match] = Editor.nodes(editor, {
		match: n =>
			!Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "math",
	});
	return !!match;
};

export const convertMathToText = (editor: Editor, mathNode: CustomElement) => {
	const path = ReactEditor.findPath(editor, mathNode);
	const newText = mathNode.children[0].text; // Assuming LaTeX is stored in `content`

	// Replace the math block with a text block containing the LaTeX string
	Transforms.removeNodes(editor, { at: path });
	Transforms.insertNodes(
		editor,
		{
			type: "paragraph", // or your default block type
			children: [{ text: newText }],
		},
		{ at: path },
	);
};
