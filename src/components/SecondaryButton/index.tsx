import { ComponentProps } from "react";

import "./style.scss";

interface SecondaryButtonI extends ComponentProps<"button"> {
	onClick?: () => void;
	backgroundColor: "lightblue" | "blue";
}

const SecondaryButton = (props: SecondaryButtonI) => {
	const { children, backgroundColor, ...buttonProps } = props;
	const color = backgroundColor === "lightblue" ? "#e9f4ff" : "#417db5";

	const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (props.onClick) props.onClick();
	};

	return (
		<button
			style={{ backgroundColor: color }}
			onClick={onClick}
			className="secondary_button"
			{...buttonProps}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
