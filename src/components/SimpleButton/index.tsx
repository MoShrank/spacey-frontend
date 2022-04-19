import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface SimpleButtonProps {
	children: React.ReactChild;
	action?: string | (() => void);
	to?: string;
}

interface NavigateI {
	children: React.ReactNode;
	action: string | (() => void) | undefined;
}

const Navigate = ({ children, action }: NavigateI) => {
	if (typeof action === "string") {
		return <Link to={action}>{children}</Link>;
	} else {
		return <span onClick={action}>{children}</span>;
	}
};

const SimpleButton = ({ children, action, to }: SimpleButtonProps) => {
	return (
		<Navigate action={to || action}>
			<button className={style.simple_button}>{children}</button>
		</Navigate>
	);
};

export default SimpleButton;
