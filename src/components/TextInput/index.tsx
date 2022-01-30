import Input from "components/Input";
import { ComponentProps } from "react";

interface texInputI extends ComponentProps<"input"> {
	error?: string;
}

const TextInput = (props: texInputI) => {
	const { error, placeholder, ...inputProps } = props;
	return (
		<Input error={error} placeholder={placeholder}>
			<input className="input" placeholder={placeholder} {...inputProps} />
		</Input>
	);
};

export default TextInput;
