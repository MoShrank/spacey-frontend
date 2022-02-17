import Loader from "components/Loader";
import { ComponentProps } from "react";

import "./style.scss";

interface ButtonProps extends ComponentProps<"button"> {
	loading?: boolean;
	disabled?: boolean;
}

const Button = (props: ButtonProps) => {
	const { children, loading, disabled, className, ...buttonProps } = props;
	return (
		<button
			disabled={disabled || loading}
			className={`button ${disabled && !loading ? "disabled" : ""} ${className}`}
			{...buttonProps}
		>
			{loading ? <Loader /> : children}
		</button>
	);
};

export default Button;
