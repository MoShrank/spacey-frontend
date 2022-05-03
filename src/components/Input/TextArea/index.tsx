import InputContainer from "components/Input/InputContainer";
import Text from "components/Text";
import { ComponentProps } from "react";
import { forwardRef } from "react";

import style from "./style.module.scss";

interface TextAreaI extends ComponentProps<"textarea"> {
	error?: string;
	height?: string;
	label?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaI>(
	(props: TextAreaI, ref) => {
		const {
			error,
			height = "126px",
			value,
			placeholder,
			label,
			maxLength,
			className,
			...inputProps
		} = props;
		return (
			<InputContainer
				height={height}
				label={label}
				error={error}
				placeholder={placeholder}
			>
				<textarea
					ref={ref}
					className={`${style.text_area} ${className}`}
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
			</InputContainer>
		);
	},
);

TextArea.displayName = "TextArea";

export default TextArea;
