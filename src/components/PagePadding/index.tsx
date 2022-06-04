import style from "./style.module.scss";

interface PagePaddingI extends React.HTMLAttributes<HTMLSpanElement> {
	children: React.ReactNode;
}

const PagePadding = ({ children, ...props }: PagePaddingI) => (
	<span className={style.padding} {...props}>
		{children}
	</span>
);

export default PagePadding;
