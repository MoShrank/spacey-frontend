import Logo from "assets/img/logo.svg";
import Button from "components/Button";
import Header from "components/Header";
import Text from "components/Text";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

interface NoLearningI {
	deck: DeckI;
}

const NoLearning = ({ deck }: NoLearningI) => {
	return (
		<div className={style.container}>
			<img src={Logo} alt="planet logo" />

			<Header kind="h2">You already finished learning this deck today</Header>
			<Text>come back tomorrow for more </Text>
			<Link to={`/decks/${deck.id}`}>
				<Button>Return to deck</Button>
			</Link>
		</div>
	);
};

export default NoLearning;
