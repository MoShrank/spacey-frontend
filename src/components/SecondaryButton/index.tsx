import { ComponentProps } from "react";

import "./style.scss";

interface SecondaryButtonI extends ComponentProps<"button"> {
	onClick?: () => void;
}

const SecondaryButton = (props: SecondaryButtonI) => {
	const { children, ...buttonProps } = props;

	const onClick = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (props.onClick) props.onClick();
	};

	return (
		<button onClick={onClick} className="secondary_button" {...buttonProps}>
			{children}
		</button>
	);
};

export default SecondaryButton;
