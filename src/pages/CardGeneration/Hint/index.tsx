import { ReactComponent as BadSmileyIcon } from "assets/icons/badSmiley.svg";
import Header from "components/Header";
import Spacer from "components/Spacer";
import Text from "components/Text";

import style from "./style.module.scss";

interface HintI {
	msg: string;
	hint: string;
}

const Hint = ({ msg, hint }: HintI) => {
	return (
		<div className={style.container}>
			<BadSmileyIcon />
			<Spacer spacing={4} />
			<Header kind="h2">{msg}</Header>
			<Spacer spacing={4} />
			<Text>{hint}</Text>
		</div>
	);
};

export default Hint;
