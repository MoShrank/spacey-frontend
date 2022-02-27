import style from "./style.module.scss";

interface BottomContainerProps {
	children: React.ReactNode;
}

const BottomContainer = ({ children }: BottomContainerProps) => {
	return <div className={style.bottom}>{children}</div>;
};

export default BottomContainer;
