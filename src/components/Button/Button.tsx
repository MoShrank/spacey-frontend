import { ComponentProps } from "react";
import "./style.scss";

const Button = (props: ComponentProps<"button">) => {
    const { children, ...buttonProps } = props;

    return (
        <button className="button" {...buttonProps}>
            {children}
        </button>
    );
};

export default Button;
