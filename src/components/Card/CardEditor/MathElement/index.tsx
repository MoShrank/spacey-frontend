import MathJax from "better-react-mathjax/MathJax";

import { CustomElement, CustomText } from "../types";
import style from "./style.module.scss";

type MathElementProps = {
	children: React.ReactNode;
	element: CustomElement;
	attributes: Record<string, unknown>;
};

const MathElement = ({ attributes, children, element }: MathElementProps) => {
	const content = element.children
		.map((child: CustomText) => child.text)
		.join(" ");
	return (
		<div {...attributes} contentEditable={false} className={style.math_block}>
			{children}
			<MathJax>{`\\(${content}\\)`}</MathJax>
		</div>
	);
};

export default MathElement;
