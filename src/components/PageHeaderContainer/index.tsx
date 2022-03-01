import style from "./style.module.scss";

interface PageHeaderContainerProps {
	children: React.ReactNode;
}

const PageHeaderContainer = ({ children }: PageHeaderContainerProps) => {
	return <div className={style.container}>{children}</div>;
};

export default PageHeaderContainer;
