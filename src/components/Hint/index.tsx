import Text from "components/Text";

import style from "./style.module.scss";

const Hint = ({ children }: { children: React.ReactNode }) => (
	<Text className={style.container} color="lightgrey">
		{children}
	</Text>
);

export default Hint;
