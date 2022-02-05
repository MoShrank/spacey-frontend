import Input from "components/Input";
import Text from "components/Text";
import { ComponentProps } from "react";

interface texInputI extends ComponentProps<"textarea"> {
	error?: string;
}

const TextArea = (props: texInputI) => {
	const { error, value, placeholder, maxLength, ...inputProps } = props;
	return (
		<Input error={error} placeholder={placeholder}>
			<textarea
				placeholder={placeholder}
				value={value}
				maxLength={maxLength}
				{...inputProps}
			/>
			<Text className="max_length_hint" color="lightgrey">{`${
				(value as string).length
			}/${maxLength}`}</Text>
		</Input>
	);
};

export default TextArea;
