import "./style.scss";

interface LoaderProps {
	size?: "small" | "large";
}

const Loader = ({ size }: LoaderProps) => {
	if (!size) size = "small";
	return <div className={`loader ${size}`}></div>;
};

export default Loader;
