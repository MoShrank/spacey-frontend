import { ComponentProps } from "react";

import "./style.scss";

const Button = (props: ComponentProps<"button">) => {
	const { children, className, ...buttonProps } = props;

	return (
		<button className={`button ${className}`} {...buttonProps}>
			{children}
		</button>
	);
};

export default Button;
