import "./style.scss";

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
		<div className={`text_input_container ${error && "error"}`}>
			{children}
			<div className="label_overlay_container">
				<span className="line" />
				<label htmlFor={placeholder}>{placeholder}</label>
			</div>
		</div>
	);
};

export default Input;
