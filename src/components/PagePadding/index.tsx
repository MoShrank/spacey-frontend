import style from "./style.module.scss";

const PagePadding = ({ children }: { children: React.ReactNode }) => (
	<span className={style.padding}>{children}</span>
);

export default PagePadding;
