import Button from "components/Button";
import CardListItem from "components/Card/CardListItem";
import Error from "components/Error";
import BottomContainer from "components/FormBottom";
import ListContainer from "components/ListContainer";
import PagePadding from "components/PagePadding";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";

import style from "./style.module.scss";

const CardList = ({
	cards,
	color,
	onClickCard,
}: {
	cards: { question: string; answer: string }[];
	color: string;
	onClickCard: (id: number) => void;
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
				/>
			))}
		</ListContainer>
	);
};

interface CardReviewI {
	cards: { question: string; answer: string }[];
	onClose: (event: React.MouseEvent<HTMLElement>) => void;
	onClickCard: (id: number) => void;
	onClickAddCards: () => void;
	loading: boolean;
	error: string;
	cardColor: string;
}

export const CardReview = ({
	cards,
	onClose,
	onClickCard,
	onClickAddCards,
	loading,
	error,
	cardColor,
}: CardReviewI) => (
	<>
		<CardList onClickCard={onClickCard} cards={cards} color={cardColor} />
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
