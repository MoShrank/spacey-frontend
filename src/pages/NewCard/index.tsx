import { createCardAction } from "actions/deck";
import Button from "components/Button";
import EditableCard from "components/EditableCard";
import BottomContainer from "components/FormBottom";
import SimpleButton from "components/SimpleButton";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";

const NewCard = () => {
	const [createCardLoading, error, action] = useAction(
		"decks",
		createCardAction,
	);
	const [decks] = useGlobalState<DeckI[]>("decks");

	const { deckID } = useParams();
	const deck = decks.find(({ id }) => id === deckID);

	const [card, setCard] = useState({
		question: "",
		answer: "",
		deckID: deckID,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(card).then(() => {
			setCard({
				question: "",
				answer: "",
				deckID: deckID,
			});
			Notificator.push({
				type: "INFO",
				payload: {
					message: "Card saved successfully",
				},
			});
		});
	};

	if (!deck) return <Navigate to="404" />;

	const handleQuestionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();

		setCard({
			...card,
			question: e.target.value,
		});
	};

	const handleAnswerInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		setCard({
			...card,
			answer: e.target.value,
		});
	};

	return (
		<EditableCard
			deck={deck}
			onSubmit={handleSubmit}
			card={card}
			onQuestionInput={handleQuestionInput}
			onAnswerInput={handleAnswerInput}
		>
			<BottomContainer>
				{error && <p className="error">{error}</p>}
				<Button loading={createCardLoading}>Create card</Button>
				<SimpleButton to={`/decks/${deck.id}`}>Cancel</SimpleButton>
			</BottomContainer>
		</EditableCard>
	);
};

export default NewCard;
