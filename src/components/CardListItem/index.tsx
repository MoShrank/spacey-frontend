import CustomTag from "components/CustomTag";
import customTagT from "components/CustomTag/type";
import Text from "components/Text";

import "./style.scss";

interface CardPropsI {
	question: string;
	answer: string;
	color: string;
	as?: customTagT;
	[key: string]: unknown;
}

const CardListItem = ({
	question,
	answer,
	color,
	as = "div",
	...rest
}: CardPropsI) => {
	return (
		<CustomTag tag={as} {...rest}>
			<div style={{ background: color }} className="card_container">
				<Text className="input_text" color="black">
					{question}
				</Text>
				<Text className="input_text" color="grey">
					{answer}
				</Text>
				<span className="line" />
			</div>
		</CustomTag>
	);
};

export default CardListItem;
