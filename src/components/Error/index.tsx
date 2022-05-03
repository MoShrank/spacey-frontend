import Text from "components/Text";

import style from "./style.module.scss";

interface ErrorI {
	children: React.ReactNode;
}

const Error = ({ children }: ErrorI) => {
	return (
		<Text color="red" className={style.error}>
			{children}
		</Text>
	);
};

export default Error;
