import style from "./style.module.scss";

interface ContentHeaderI {
	children: React.ReactNode;
}

const ContentHeader = ({ children }: ContentHeaderI) => (
	<div className={style.header}>{children}</div>
);

export default ContentHeader;
