import { createCardAction, getDecks } from "actions/deck";
import Button from "components/Button";
import CardContainer from "components/CardContainer";
import Form from "components/Form";
import FormBottom from "components/FormBottom";
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(card).then(() => navigate(`/decks/${deckID}`));
	};

	if (!deck?.name) {
		if (loading) return <Loader />;
		else return <Navigate to="404" />;
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Header kind="h2">{deck.name}</Header>
			<CardContainer color={deck.color}>
				<div
					role="textinput"
					contentEditable={true}
					onInput={e =>
						setCard({
							...card,
							question: e.currentTarget.textContent || "",
						})
					}
					className={`${style.input} ${style.question}`}
				></div>
				<div
					role="textinput"
					contentEditable={true}
					onInput={e =>
						setCard({
							...card,
							answer: e.currentTarget.textContent || "",
						})
					}
					className={`${style.input} ${style.answer}`}
				></div>
			</CardContainer>
			<FormBottom>
				{error && <p className="error">{error}</p>}
				<Button loading={createCardLoading}>Create card</Button>
				<SimpleButton to={`/decks/${deckID}`}>Cancel</SimpleButton>
			</FormBottom>
		</Form>
	);
};

export default NewCard;
