import Input from "components/Input";
import Text from "components/Text";
import { ComponentProps } from "react";

import style from "./style.module.scss";

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
			{maxLength && (
				<Text className={style.max_length_hint} color="lightgrey">
					{maxLength - (value as string).length}
				</Text>
			)}
		</Input>
	);
};

export default TextArea;
