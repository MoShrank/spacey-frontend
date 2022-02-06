import { createCardAction } from "actions/deck";
import Button from "components/Button";
import CardContainer from "components/CardContainer";
import Header from "components/Header";
import SimpleButton from "components/SimpleButton";
import useAction from "hooks/useAction";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import style from "./style.module.scss";

const NewCard = () => {
	const [, , action] = useAction("decks", createCardAction);

	const navigate = useNavigate();

	const { deckID } = useParams();

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
		action(card).then(() => navigate("/"));
	};

	return (
		<>
			<Header kind="h2">Spanish Lecture</Header>
			<form onSubmit={handleSubmit}>
				<CardContainer>
					<div
						role="textinput"
						contentEditable={true}
						onKeyDown={setQuestion}
						className={`${style.input} ${style.question}`}
					></div>
					<div
						role="textinput"
						contentEditable={true}
						onKeyDown={setAnswer}
						className={`${style.input} ${style.answer}`}
					></div>
				</CardContainer>
				<Button>Create card</Button>
				<SimpleButton to={`/decks/${deckID}`}>Cancel</SimpleButton>
			</form>
		</>
	);
};

export default NewCard;
