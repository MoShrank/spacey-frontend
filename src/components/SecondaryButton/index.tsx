import { ComponentProps } from "react";

import "./style.scss";

interface SecondaryButtonI extends ComponentProps<"button"> {
	onClick?: () => void;
	backgroundColor: "lightblue" | "blue" | "darkblue";
}

const colors = {
	darkblue: "#19344c",
	blue: "#417db5",
	lightblue: "#e9f4ff",
};

const SecondaryButton = (props: SecondaryButtonI) => {
	const { children, backgroundColor, ...buttonProps } = props;
	const backgroundColorStyle = colors[backgroundColor];

	const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (props.onClick) props.onClick();
	};

	return (
		<button
			style={{ backgroundColor: backgroundColorStyle }}
			onClick={onClick}
			className="secondary_button"
			{...buttonProps}
		>
			{children}
		</button>
	);
};

export default SecondaryButton;
