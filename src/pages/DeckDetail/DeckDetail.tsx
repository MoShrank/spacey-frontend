import { getDecks } from "actions/deck";
import { ReactComponent as EditIcon } from "assets/icons/edit.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import CardCount from "components/CardCount/CardCount";
import CardListItem from "components/CardListItem";
import FloatingButton from "components/FloatingButton";
import Header from "components/Header";
import ListContainer from "components/ListContainer";
import Loader from "components/Loader";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useOnClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./style.scss";

interface DescriptionPopupProps {
	description: string;
}

const DescriptionPopup = forwardRef<HTMLDivElement, DescriptionPopupProps>(
	(props, ref) => {
		return (
			<div ref={ref} className="description_popup">
				<Text color="darkblue">{props.description}</Text>
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
	if (deck) {
		deck.cards = [
			{
				id: "1",
				question: "What is the capital of France?",
				answer: "Paris",
			},
			{
				id: "2",
				question: "What is the capital of France?",
				answer: "Paris",
			},
			{
				id: "4",
				question: "What is the capital of France?",
				answer: "Paris",
			},
		];
	}

	if (loading || !deck) {
		return <Loader />;
	}

	return (
		<div className="deck_detail_container">
			<div className="deck_detail_header">
				<Text color="darkblue">{deck?.name}</Text>
				{infoOpen && <DescriptionPopup ref={ref} description={deck.description} />}
				<InfoIcon onClick={() => setInfoOpen(!infoOpen)} />
				<Link to={"deck/edit"}>
					<EditIcon />
				</Link>
			</div>
			<Header kind="h2">Your Cards</Header>
			<CardCount count={deck.cards.length} />
			<ListContainer>
				{deck?.cards.map(card => (
					<CardListItem key={card.id} color={deck.color} {...card} />
				))}
			</ListContainer>
			<Link className="floating_container" to={"card/new"}>
				<FloatingButton />
			</Link>
			{infoOpen && <span className="overlay" />}
		</div>
	);
};

export default DeckDetail;
