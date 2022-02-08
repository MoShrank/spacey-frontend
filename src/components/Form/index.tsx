import style from "./style.module.scss";

interface FormProps extends React.ComponentPropsWithoutRef<"form"> {
	children: React.ReactNode;
}

const Form = ({ children, ...props }: FormProps) => {
	return (
		<form className={style.form} {...props}>
			{children}
		</form>
	);
};

export default Form;
