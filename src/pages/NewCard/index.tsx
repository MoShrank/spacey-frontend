import { createCardAction, getDecks } from "actions/deck";
import EditableCard from "components/EditableCard";
import Loader from "components/Loader";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const NewCard = () => {
	const [createCardLoading, error, action] = useAction(
		"decks",
		createCardAction,
	);
	const [loading, , decks] = useAPIFetch("decks", getDecks);

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
		});
	};

	if (!deck?.name) {
		if (loading) return <Loader />;
		else return <Navigate to="404" />;
	}

	const handleQuestionInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		console.log(e.target.value);

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
			error={error}
			loading={createCardLoading}
			onQuestionInput={handleQuestionInput}
			onAnswerInput={handleAnswerInput}
			buttonText="Create Card"
		/>
	);
};

export default NewCard;
