import { generateCardAction } from "actions/deck";
import Button from "components/Button";
import CardListItem from "components/Card/CardListItem";
import Error from "components/Error";
import BottomContainer from "components/FormBottom";
import ListContainer from "components/ListContainer";
import PagePadding from "components/PagePadding";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import useActionZ from "hooks/useAction";
import { useState } from "react";
import { GeneratedCard } from "types/note";

import Highlight from "./Highlight";
import style from "./style.module.scss";

const CardList = ({
	cards,
	color,
	onClickCard,
	onHoverIn,
	onHoverOut,
}: {
	cards: GeneratedCard[];
	color: string;
	onClickCard: (id: number) => void;
	onHoverIn: (start: number, end: number) => void;
	onHoverOut: () => void;
}) => {
	return (
		<ListContainer>
			{cards.map((card, idx) => (
				<CardListItem
					as="button"
					className={style.unstyled_button}
					onClick={() => onClickCard(idx)}
					key={idx}
					question={card.question}
					answer={card.answer}
					color={color}
					onMouseEnter={() =>
						onHoverIn(card.source_start_index, card.source_end_index)
					}
					onMouseLeave={onHoverOut}
				/>
			))}
		</ListContainer>
	);
};
interface CardReviewI {
	cards: GeneratedCard[];
	onClose: (event: React.MouseEvent<HTMLElement>) => void;
	onClickCard: (id: number) => void;
	onClickAddCards: () => void;
	loading: boolean;
	error: string | undefined;
	cardColor: string;
	text: string;
	noteID: string;
	deckID: string;
	isMobile: boolean;
}

export const CardReview = ({
	cards,
	onClose,
	onClickCard,
	onClickAddCards,
	loading,
	error,
	cardColor,
	text,
	isMobile,
	noteID,
	deckID,
}: CardReviewI) => {
	const [cardSelectedIndices, setSelectedCardIndices] = useState<
		{ start: number; end: number } | undefined
	>(undefined);

	const [, , generateCardCall] = useActionZ(
		state => state.notes,
		generateCardAction,
	);

	const onHoverIn = (start: number, end: number) => {
		setSelectedCardIndices({ start, end });
	};

	const onHoverOut = () => {
		setSelectedCardIndices(undefined);
	};

	const onGenerateCard = (start: number, end: number) => {
		const generateCardText = text.slice(start, end);

		generateCardCall(noteID, {
			source_start_index: start,
			source_end_index: end,
			text: generateCardText,
			deckID,
		});
	};

	const highlightedSection = cards.map(card => ({
		start: card.source_start_index,
		end: card.source_end_index,
	}));

	const CL = (
		<CardList
			onClickCard={onClickCard}
			onHoverIn={onHoverIn}
			onHoverOut={onHoverOut}
			cards={cards}
			color={cardColor}
		/>
	);

	return (
		<>
			{isMobile ? (
				CL
			) : (
				<div className={style.divider}>
					<Highlight
						highlightSections={highlightedSection}
						selectedCard={cardSelectedIndices}
						onGenerateCard={onGenerateCard}
					>
						{text}
					</Highlight>
					{CL}
				</div>
			)}
			<Spacer spacing={2} />
			{error && <Error>{error}</Error>}
			<BottomContainer>
				<PagePadding>
					<Button loading={loading} onClick={onClickAddCards}>
						Add Cards to Deck
					</Button>
					<SimpleButton as="button" onClick={onClose}>
						Cancel
					</SimpleButton>
				</PagePadding>
			</BottomContainer>
		</>
	);
};
