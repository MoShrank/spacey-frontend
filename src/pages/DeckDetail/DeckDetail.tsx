import { getDecks } from "actions/deck";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import { ReactComponent as LearnIcon } from "assets/icons/learn.svg";
import CardCount from "components/CardCount/CardCount";
import CardListItem from "components/CardListItem";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import HeaderContainer from "components/HeaderContainer";
import Hint from "components/Hint";
import ListContainer from "components/ListContainer";
import Loader from "components/Loader";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import PageHeaderContainer from "components/PageHeaderContainer";
import SecondaryButton from "components/SecondaryButton";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useOnClickOutside from "hooks/useClickOutside";
import useLockBodyScroll from "hooks/useScrollLock";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import "./style.scss";

const emptyDeckPlaceholder =
	"No description yet. Click the edit button to add a description.";

interface DescriptionPopupProps {
	description: string;
}

const DescriptionPopup = forwardRef<HTMLDivElement, DescriptionPopupProps>(
	(props, ref) => {
		useLockBodyScroll();

		return (
			<div ref={ref} className="description_popup">
				<Text color={props.description ? "black" : "lightgrey"}>
					{props.description || emptyDeckPlaceholder}
				</Text>
			</div>
		);
	},
);
DescriptionPopup.displayName = "DescriptionPopup";

const DeckDetail = () => {
	const [loading, , decks] = useAPIFetch("decks", getDecks);
	const { deckID } = useParams();
	const [infoOpen, setInfoOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => setInfoOpen(false));

	const deck = decks.find(deck => deck.id === deckID);

	if (!deck) {
		if (loading) {
			return <Loader size="large" />;
		} else {
			return <Navigate to="/404" />;
		}
	}

	return (
		<div className="deck_detail_container">
			<PageHeaderContainer>
				<div className="deck_detail_header">
					<Text color="darkblue" className="title">
						{deck?.name}
					</Text>
					{infoOpen && <DescriptionPopup ref={ref} description={deck.description} />}
					<InfoIcon id="info_icon" onClick={() => setInfoOpen(!infoOpen)} />
					<Link to="edit">
						<EditIcon />
					</Link>
				</div>
				<div className="memory_stability_indicator">
					<MemoryStabilityIndicator
						probability={deck.averageRecallProbability}
						styles={{ width: "24px", height: "24px" }}
						fill={"blue"}
					></MemoryStabilityIndicator>
				</div>
				<HeaderContainer>
					<Header kind="h2">Your Cards</Header>
					<Link to="card/new">
						<FloatingButton />
					</Link>
				</HeaderContainer>
				<CardCount count={deck.cards.length} />
			</PageHeaderContainer>
			{deck?.cards.length ? (
				<ListContainer>
					{deck.cards.map(card => (
						<CardListItem key={card.id} color={deck.color} {...card} />
					))}
				</ListContainer>
			) : (
				<Hint>No cards yet. Click the plus button to add a card.</Hint>
			)}
			{deck.cards.length > 0 && (
				<Link className="floating_container" to={`/learn/${deckID}`}>
					<SecondaryButton onClick={undefined} backgroundColor="darkblue">
						<LearnIcon />
						<Text color="white">Learn</Text>
					</SecondaryButton>
				</Link>
			)}
			{infoOpen && <span className="overlay" />}
		</div>
	);
};

export default DeckDetail;
