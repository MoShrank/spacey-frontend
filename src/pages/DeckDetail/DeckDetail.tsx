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
import Layout from "components/Layout";
import ListContainer from "components/ListContainer";
import Loader from "components/Loader";
import MemoryStabilityIndicator from "components/MemoryStabilityIndicator";
import PageHeaderContainer from "components/PageHeaderContainer";
import SecondaryButton from "components/SecondaryButton";
import Spacer from "components/Spacer";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useOnClickOutside from "hooks/useClickOutside";
import useLockBodyScroll from "hooks/useScrollLock";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import style from "./style.module.scss";

const emptyDeckPlaceholder =
	"No description yet. Click the edit button to add a description.";

interface DescriptionPopupProps {
	description: string;
}

const DescriptionPopup = forwardRef<HTMLDivElement, DescriptionPopupProps>(
	(props, ref) => {
		useLockBodyScroll();

		return (
			<div ref={ref} className={style.description_popup}>
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
		<Layout width="full">
			<PageHeaderContainer>
				<div className={style.deck_detail_header}>
					<Text color="darkblue">{deck?.name}</Text>
					{infoOpen && <DescriptionPopup ref={ref} description={deck.description} />}
					<InfoIcon
						className={style.info_icon}
						onClick={() => setInfoOpen(!infoOpen)}
					/>
					<Link to="edit">
						<EditIcon />
					</Link>
				</div>
				<div className={style.memory_stability_indicator_container}>
					<MemoryStabilityIndicator
						probability={deck.averageRecallProbability}
						styles={{ width: "24px", height: "24px" }}
						fill={"blue"}
					></MemoryStabilityIndicator>
				</div>
				<Spacer spacing={2} />
				<HeaderContainer>
					<Header kind="h2">Your Cards</Header>
					<Link to="card/new">
						<FloatingButton />
					</Link>
				</HeaderContainer>
				<Spacer spacing={2} />
				<CardCount count={deck.cards.length} />
			</PageHeaderContainer>
			<Spacer spacing={1} />
			{deck?.cards.length ? (
				<ListContainer spacing={2}>
					{deck.cards.map(card => (
						<CardListItem key={card.id} color={deck.color} {...card} />
					))}
				</ListContainer>
			) : (
				<Hint>No cards yet. Click the plus button to add a card.</Hint>
			)}
			{deck.cards.length > 0 && (
				<Link className={style.floating_container} to={`/learn/${deckID}`}>
					<SecondaryButton onClick={undefined} backgroundColor="darkblue">
						<LearnIcon />
						<Text color="white">Learn</Text>
					</SecondaryButton>
				</Link>
			)}
			{infoOpen && <span className={style.overlay} />}
		</Layout>
	);
};

export default DeckDetail;
