import { ReactComponent as Logo } from "assets/img/logo.svg";
import Button from "components/Button";
import Header from "components/Header";
import ScalingSVG from "components/ScalingSVG";
import Spacer from "components/Spacer";
import Text from "components/Text";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

interface NoLearningI {
	deck: DeckI;
}

const NoLearning = ({ deck }: NoLearningI) => {
	return (
		<>
			<ScalingSVG icon={Logo} className={style.img} />
			<div className={style.container}>
				<Spacer spacing={2} />
				<Header className={style.center} kind="h2">
					You already finished learning this deck today
				</Header>
				<Spacer spacing={2} />
				<Text className={style.center}>come back tomorrow for more </Text>
				<Spacer spacing={2} />
			</div>
			<Link to={`/decks/${deck.id}`}>
				<Button>Return to Deck</Button>
			</Link>
		</>
	);
};

export default NoLearning;
