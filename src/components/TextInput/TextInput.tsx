import { ComponentProps } from "react";
import "./style.scss";

interface texInputI extends ComponentProps<"input"> {
    error?: string;
}

const TextInput = (props: texInputI) => {
    const { error, ...inputPropbs } = props;
    return (
        <div className={`text_input_container ${error && "error"}`}>
            <span className="line" />
            <input className="input" {...inputPropbs} />
            <div className="label_overlay_container">
                <span className="line" />
                <label>{props.placeholder}</label>
            </div>
        </div>
    );
};

export default TextInput;
