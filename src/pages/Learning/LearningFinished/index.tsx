import { ReactComponent as LogoIcon } from "assets/img/logo.svg";
import Button from "components/Button";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import ScalingSVG from "components/ScalingSVG";
import Text from "components/Text";
import { Link } from "react-router-dom";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

interface LearningFinishedI {
	deck: DeckI;
	totalNoCards: number;
}

const LearningFinished = ({ deck, totalNoCards }: LearningFinishedI) => {
	return (
		<div className={style.container}>
			<ScalingSVG icon={LogoIcon} />
			<Header kind="h2">You finished learning</Header>
			<Header kind="h2" color="secondary">
				{totalNoCards} {totalNoCards === 1 ? "card" : "cards"}
			</Header>
			<div className={style.indicator_text_container}>
				<Header kind="h3">This deck is now on fire!</Header>
				<div className={style.indicator}>
					<MemoryStabilityIndicator
						styles={{ width: "40px", height: "40px" }}
						probability={1}
						fill={"blue"}
					></MemoryStabilityIndicator>
				</div>
				<Text className={style.center}>Come back tomorrow to keep it burning</Text>
			</div>
			<BottomContainer>
				<Link to={`/decks/${deck.id}`}>
					<Button>Come back tomorrow</Button>
				</Link>
			</BottomContainer>
		</div>
	);
};

export default LearningFinished;
