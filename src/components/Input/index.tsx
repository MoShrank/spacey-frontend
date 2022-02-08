import style from "./style.module.scss";

/*
children slicing is done because first children is supposed to be
the input element itself while the rest can be something else
(e.g. char limit on textarea) this is probably not the most elegant way
and should be refactored in the future
*/

const Input = ({
	error,
	placeholder,
	children,
}: {
	error?: string;
	placeholder?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={`${style.text_input_container} ${error && style.error}`}>
			{Array.isArray(children) ? children[0] : children}
			<div className={style.label_overlay_container}>
				<span className={style.line} />
				<label htmlFor={placeholder}>{placeholder}</label>
			</div>
			{Array.isArray(children) ? children.slice(1) : null}
		</div>
	);
};

export default Input;
