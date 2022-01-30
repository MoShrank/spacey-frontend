import Input from "components/Input";
import { ComponentProps } from "react";

interface texInputI extends ComponentProps<"textarea"> {
	error?: string;
}

const TextArea = (props: texInputI) => {
	const { error, placeholder, ...inputProps } = props;
	return (
		<Input error={error} placeholder={placeholder}>
			<textarea placeholder={placeholder} {...inputProps} />
		</Input>
	);
};

export default TextArea;
