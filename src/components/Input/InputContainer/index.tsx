import style from "./style.module.scss";

interface LabelI {
	children?: string;
	error: boolean;
}

const Label = ({ children, error }: LabelI) => {
	return (
		<div className={style.label_overlay_container}>
			<span className={style.line} />
			<label className={`${error || ""}`} htmlFor={children}>
				{children}
			</label>
		</div>
	);
};

interface InputContainerI {
	children: React.ReactNode;
	error?: string;
	placeholder?: string;
	className?: string;
	height?: string;
	label?: string;
}

const InputContainer = ({
	children,
	error,
	placeholder,
	className,
	height,
	label,
}: InputContainerI) => {
	return (
		<div
			className={`${style.text_input_container} ${error && style.error} ${
				className || ""
			} `}
			style={{ height: height, minHeight: height, maxHeight: height }}
		>
			{children}
			<Label error={!!error}>{placeholder || label}</Label>
		</div>
	);
};

export default InputContainer;
