import Text from "components/Text";
import { Link } from "react-router-dom";

import "./style.scss";

interface CardPropsI {
	question: string;
	answer: string;
	id: string;
	color: string;
}

const CardListItem = ({ question, answer, id, color }: CardPropsI) => {
	return (
		<Link to={`card/${id}`}>
			<div style={{ background: color }} className="card_container">
				<Text className="input_text" color="black">
					{question}
				</Text>
				<span className="line" />
				<Text className="input_text" color="grey">
					{answer}
				</Text>
			</div>
		</Link>
	);
};

export default CardListItem;
