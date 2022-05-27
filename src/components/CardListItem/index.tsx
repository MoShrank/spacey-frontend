import CustomTag from "components/CustomTag";
import Text from "components/Text";

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
	...rest
}: CardPropsI) => {
	return (
		<CustomTag
			tag={as}
			{...rest}
			style={{ background: color }}
			className={style.card_container}>
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
