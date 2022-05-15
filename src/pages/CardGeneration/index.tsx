import {
	addGeneratedCardsAction,
	generateCardsAction,
	updateGeneratedCardsAction,
} from "actions/deck";
import Button from "components/Button";
import ContentWidthConstraint from "components/ContentWidthConstraint";
import DeleteDialog from "components/DeleteDialog";
import EditableCard from "components/EditableCard";
import Error from "components/Error";
import BottomContainer from "components/FormBottom";
import Header from "components/Header";
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Swiper from "components/Swiper";
import Text from "components/Text";
import useAction from "hooks/useAction";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { next, prev } from "util/array";

import CardGenerationInput from "./CardGenerationInput";
import { CardReview } from "./CardReview";
import style from "./style.module.scss";

enum pageStates {
	GENERATE = "generate",
	LOADING = "loading",
	REVIEW = "review",
	EDIT = "edit",
}

const pageHeader = {
	[pageStates.GENERATE]: "Generate Cards",
	[pageStates.LOADING]: "Loading...",
	[pageStates.REVIEW]: "Review Cards",
	[pageStates.EDIT]: "Edit Cards",
};

const CardGeneration = () => {
	const { deckID } = useParams();
	const [decks] = useGlobalState<DeckI[]>("decks");
	const deck = decks.find(d => d.id === deckID);

	if (!deckID || !deck) return <Navigate to="404" />;

	const [note, setNote] = useState("");

	const [notes, setNotes] = useGlobalState<Record<string, NoteI>>("notes");
	const exiNote = notes[deckID];
	const [card, setCard] = useState({ question: "", answer: "", idx: -1 });

	let cardDifferent;
	if (exiNote && card.idx !== -1) {
		const originalCard = exiNote.cards[card.idx];
		cardDifferent =
			originalCard.question !== card.question ||
			originalCard.answer !== card.answer;
	}

	const navigate = useNavigate();

	const [generatedLoading, generateError, generateCardsCall] = useAction(
		"notes",
		generateCardsAction,
	);
	const [addLoading, addError, addGeneratedCardsCall] = useAction(
		"decks",
		addGeneratedCardsAction,
	);
	const [updateLoading, updateError, updateCards] = useAction(
		"notes",
		updateGeneratedCardsAction,
	);

	let initialPageState;
	if (generatedLoading) initialPageState = pageStates.LOADING;
	else if (exiNote) initialPageState = pageStates.REVIEW;
	else initialPageState = pageStates.GENERATE;

	const [pageState, setPageState] = useState<pageStates>(initialPageState);

	const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		try {
			setPageState(pageStates.LOADING);
			await generateCardsCall(deckID, note);
			setPageState(pageStates.REVIEW);
		} catch (e) {
			/* tslint:disable:no-empty */
		}
	};

	const onClickCard = (id: number) => {
		setCard({ ...exiNote.cards[id], idx: id });
		setPageState(pageStates.EDIT);
	};

	const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newCards = exiNote.cards.map((c, idx) => {
			if (idx === card.idx) c = card;
			return c;
		});

		try {
			await updateCards(exiNote.id, deckID, exiNote.cards, card);
			setNotes({
				...notes,
				[deckID]: { ...exiNote, cards: newCards },
			});
			setPageState(pageStates.REVIEW);
			setCard({ question: "", answer: "", idx: -1 });
		} catch (e) {
			/* tslint:disable:no-empty */
		}
	};

	const onClickAddCards = () => {
		addGeneratedCardsCall(exiNote.id, deckID).then(() => {
			setPageState(pageStates.LOADING);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [deckID]: _selectNote, ...restNotes } = notes;
			setNotes(restNotes);
			navigate(`/decks/${deckID}`);
		});
	};

	const onClose = (e?: React.MouseEvent<HTMLElement>) => {
		if (e) e.preventDefault();
		navigate(`/decks/${deckID}`);
	};

	const onCloseEdit = (e?: React.MouseEvent<HTMLElement>) => {
		if (e) e.preventDefault();
		setPageState(pageStates.REVIEW);
	};

	const handleNext = () => {
		const nextIdx = next(exiNote.cards, card.idx);
		setCard({ ...exiNote.cards[nextIdx], idx: nextIdx });
	};

	const handlePrev = () => {
		const prevIdx = prev(exiNote.cards, card.idx);
		setCard({ ...exiNote.cards[prevIdx], idx: prevIdx });
	};

	const handleDelete = () => {
		const newCards = exiNote.cards.filter((c, idx) => {
			if (idx !== card.idx) return c;
		});

		updateCards(exiNote.id, deckID, newCards);
		setNotes({
			...notes,
			[deckID]: { ...exiNote, cards: newCards },
		});
		setPageState(pageStates.REVIEW);
		setCard({ question: "", answer: "", idx: -1 });
	};

	let Component = <Navigate to="/404" />;

	switch (pageState) {
		case pageStates.LOADING:
			Component = <Loader size="large" />;
			break;

		case pageStates.GENERATE:
			Component = (
				<CardGenerationInput
					onClose={onClose}
					onSubmit={onSubmit}
					setNote={setNote}
					note={note}
					error={generateError}
				/>
			);
			break;

		case pageStates.REVIEW:
			Component = (
				<CardReview
					cards={exiNote.cards}
					onClose={onClose}
					onClickCard={onClickCard}
					onClickAddCards={onClickAddCards}
					loading={addLoading}
					error={addError}
				/>
			);
			break;

		case pageStates.EDIT:
			Component = (
				<ContentWidthConstraint className={style.flex_grow}>
					<EditableCard
						onSubmit={onSubmitEdit}
						card={card}
						deck={deck}
						onAnswerInput={e => setCard({ ...card, answer: e.target.value })}
						onQuestionInput={e => setCard({ ...card, question: e.target.value })}
					>
						{updateError && <Error>{updateError}</Error>}
						<DeleteDialog onDelete={handleDelete}>Delete card</DeleteDialog>
						<Swiper handleNext={handleNext} handlePrev={handlePrev}>
							card {card.idx + 1} of {exiNote.cards.length}
						</Swiper>
						<BottomContainer>
							<Button loading={updateLoading} disabled={!cardDifferent}>
								Save card
							</Button>
							<SimpleButton as="button" onClick={onCloseEdit}>
								Cancel
							</SimpleButton>
						</BottomContainer>
					</EditableCard>
				</ContentWidthConstraint>
			);
			break;
	}

	return (
		<Modal>
			<ModalLayout
				width="desktop"
				onClose={pageState === pageStates.EDIT ? onCloseEdit : onClose}
			>
				<Text className={style.align_left}>{deck.name}</Text>
				<Spacer spacing={1} />
				<Header className={style.align_left} kind="h1">
					{pageHeader[pageState]}
				</Header>
				<Spacer spacing={2} />
				{Component}
			</ModalLayout>
		</Modal>
	);
};

export default CardGeneration;