import style from "./style.module.scss";

interface LoaderProps {
	size?: "small" | "large";
	children?: React.ReactNode;
}

const Loader = ({ size, children }: LoaderProps) => {
	if (!size) size = "small";
	return (
		<div className={style.container}>
			<div className={`${style.loader} ${style[size]}`} />
			{children}
		</div>
	);
};

export default Loader;
