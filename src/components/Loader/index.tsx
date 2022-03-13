import style from "./style.module.scss";

interface LoaderProps {
	size?: "small" | "large";
}

const Loader = ({ size }: LoaderProps) => {
	if (!size) size = "small";
	return <div className={`${style.loader} ${style[size]}`}></div>;
};

export default Loader;
