import style from "./style.module.scss";

/*
children slicing is done because first children is supposed to be
the input element itself while the rest can be something else
(e.g. char limit on textarea) this is probably not the most elegant way
and should be refactored in the future
*/

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
			className={`${style.text_input_container} ${
				error && style.error
			} ${className}`}
			style={{ height: height }}
		>
			{Array.isArray(children) ? children[0] : children}
			<div className={style.label_overlay_container}>
				<span className={style.line} />
				<label htmlFor={placeholder}>{placeholder || label}</label>
			</div>
			{Array.isArray(children) ? children.slice(1) : null}
		</div>
	);
};

export default InputContainer;
