import InputContainer from "components/InputContainer";
import { ComponentProps } from "react";

interface texInputI extends ComponentProps<"input"> {
	error?: string;
}

const TextInput = (props: texInputI) => {
	const { error, placeholder, ...inputProps } = props;
	return (
		<InputContainer height="42px" error={error} placeholder={placeholder}>
			<input placeholder={placeholder} {...inputProps} />
		</InputContainer>
	);
};

export default TextInput;
