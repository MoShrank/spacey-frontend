import CustomTag from "components/CustomTag";
import { combineStyles } from "util/css";

import CardContentPreview from "../CardContentPreview";
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
			<CardContentPreview color="black" content={question} />
			<CardContentPreview color="grey" content={answer} />
			<span className={style.line} />
		</CustomTag>
	);
};

export default CardListItem;
