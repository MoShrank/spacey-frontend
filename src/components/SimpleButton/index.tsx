import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface SimpleButtonProps {
	children: React.ReactChild;
	to: string;
}

const SimpleButton = ({ children, to }: SimpleButtonProps) => {
	return (
		<Link to={to}>
			<button className={style.simple_button}>{children}</button>
		</Link>
	);
};

export default SimpleButton;
