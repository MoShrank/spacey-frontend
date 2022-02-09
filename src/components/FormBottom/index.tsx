import style from "./style.module.scss";

interface FormBottomProps {
	children: React.ReactNode;
}

const FormBottom = ({ children }: FormBottomProps) => {
	return <div className={style.bottom}>{children}</div>;
};

export default FormBottom;
