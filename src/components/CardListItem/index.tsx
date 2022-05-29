import CustomTag from "components/CustomTag";
import Text from "components/Text";
import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface CardPropsI {
	question: string;
	answer: string;
	color: string;
	as?: React.ElementType;
	[key: string]: unknown;
}

const CardListItem = ({
	question,
	answer,
	color,
	as = "span",
	className,
	...rest
}: CardPropsI) => {
	return (
		<CustomTag
			tag={as}
			{...rest}
			style={{ background: color }}
			className={combineStyles(
				style.card_container,
				className as string | undefined,
			)}
		>
			<Text className={style.card_text} color="black">
				{question}
			</Text>
			<Text className={style.card_text} color="grey">
				{answer}
			</Text>
			<span className={style.line} />
		</CustomTag>
	);
};

export default CardListItem;
