import { createCardAction, getDecks } from "actions/deck";
import Button from "components/Button";
import CardContainer from "components/CardContainer";
import Header from "components/Header";
import Loader from "components/Loader";
import SimpleButton from "components/SimpleButton";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import style from "./style.module.scss";

const NewCard = () => {
	const [createCardLoading, error, action] = useAction(
		"decks",
		createCardAction,
	);
	const [loading, , decks] = useAPIFetch("decks", getDecks);

	const navigate = useNavigate();

	const { deckID } = useParams();
	const deck = decks.find(({ id }) => id === deckID);

	const [card, setCard] = useState({
		question: "",
		answer: "",
		deckID: deckID,
	});

	const setQuestion = (e: React.FormEvent<HTMLDivElement>) => {
		setCard({
			...card,
			question: e.currentTarget.textContent ? e.currentTarget.textContent : "",
		});
	};

	const setAnswer = (e: React.FormEvent<HTMLDivElement>) => {
		setCard({
			...card,
			answer: e.currentTarget.textContent ? e.currentTarget.textContent : "",
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(card).then(() => navigate(`/decks/${deckID}`));
	};

	if (!deck?.name) {
		if (loading) return <Loader />;
		else return <Navigate to="404" />;
	}

	return (
		<>
			<Header kind="h2">{deck.name}</Header>
			<form className={style.form} onSubmit={handleSubmit}>
				<CardContainer>
					<div
						role="textinput"
						contentEditable={true}
						onInput={setQuestion}
						className={`${style.input} ${style.question}`}
					></div>
					<div
						role="textinput"
						contentEditable={true}
						onInput={setAnswer}
						className={`${style.input} ${style.answer}`}
					></div>
				</CardContainer>
				{error && <p className="error">{error}</p>}
				<Button loading={createCardLoading}>Create card</Button>
				<SimpleButton to={`/decks/${deckID}`}>Cancel</SimpleButton>
			</form>
		</>
	);
};

export default NewCard;
