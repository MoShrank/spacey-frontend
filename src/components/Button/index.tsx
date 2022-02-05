import Loader from "components/Loader";
import { ComponentProps } from "react";

import "./style.scss";

interface ButtonProps extends ComponentProps<"button"> {
	loading?: boolean;
}

const Button = (props: ButtonProps) => {
	const { children, loading, className, ...buttonProps } = props;
	return (
		<button className={`button ${className}`} {...buttonProps}>
			{loading ? <Loader /> : children}
		</button>
	);
};

export default Button;
