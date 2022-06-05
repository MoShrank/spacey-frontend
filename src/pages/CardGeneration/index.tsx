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
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import PagePadding from "components/PagePadding";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Swiper from "components/Swiper";
import Text from "components/Text";
import useAction from "hooks/useAction";
import useMediaQuery from "hooks/useMediaQuery";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { next, prev } from "util/array";

import CardGenerationInput from "./CardGenerationInput";
import { CardReview } from "./CardReview";
import Hint from "./Hint";
import ProgressIndicator from "./ProgressIndicator";
import style from "./style.module.scss";

enum pageStates {
	GENERATE = "generate",
	LOADING = "loading",
	REVIEW = "review",
	EDIT = "edit",
	NO_CARDS = "noCards",
	CARDS_DELETED = "cardsDeleted",
}

const pageStateOrder = {
	[pageStates.GENERATE]: 1,
	[pageStates.LOADING]: 2,
	[pageStates.NO_CARDS]: 2,
	[pageStates.REVIEW]: 3,
	[pageStates.EDIT]: 3,
	[pageStates.CARDS_DELETED]: 3,
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
	else if (exiNote.cards.length === 0)
		initialPageState = pageStates.CARDS_DELETED;
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
			setPageState(pageStates.GENERATE);
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

		if (newCards.length > 0) setPageState(pageStates.REVIEW);
		else {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			setPageState(pageStates.CARDS_DELETED);
		}

		setCard({ question: "", answer: "", idx: -1 });
	};

	let Component = <Navigate to="/404" />;

	switch (pageState) {
		case pageStates.LOADING:
			Component = (
				<>
					<Loader size="large">
						<Spacer spacing={2} />
						<Text color="grey">Your cards are being generated</Text>
					</Loader>
				</>
			);
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

		case pageStates.NO_CARDS:
			Component = (
				<ContentWidthConstraint>
					<Hint
						msg="Unfortunately no cards could be generated."
						hint="Please enter another text."
					/>
					<Button>Go Back</Button>
					<SimpleButton as="button">Cancel</SimpleButton>
				</ContentWidthConstraint>
			);
			break;

		case pageStates.REVIEW:
			Component = (
				<CardReview
					cardColor={deck.color}
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
				<ContentWidthConstraint>
					<EditableCard
						onSubmit={onSubmitEdit}
						card={{ id: `${card.idx}`, ...card }}
						deck={deck}
						onAnswerInput={e => setCard({ ...card, answer: e })}
						onQuestionInput={e => setCard({ ...card, question: e })}
					>
						{updateError && <Error>{updateError}</Error>}
						<Spacer spacing={3} />
						<DeleteDialog onDelete={handleDelete}>Delete Card</DeleteDialog>
						<Spacer spacing={3} />
						<Swiper handleNext={handleNext} handlePrev={handlePrev}>
							card {card.idx + 1} of {exiNote.cards.length}
						</Swiper>
						<Spacer spacing={3} />
						<BottomContainer>
							<Button loading={updateLoading} disabled={!cardDifferent}>
								Save Card
							</Button>
							<SimpleButton as="button" onClick={onCloseEdit}>
								Cancel
							</SimpleButton>
						</BottomContainer>
					</EditableCard>
				</ContentWidthConstraint>
			);
			break;

		case pageStates.CARDS_DELETED:
			Component = (
				<ContentWidthConstraint>
					<Hint
						msg="Seems like all cards were deleted."
						hint="Please enter a text or regenerate the cards."
					/>
					<SimpleButton as="button">Regenerate Cards</SimpleButton>{" "}
					{/* TODO get original cards from beginning? */}
					<Button>Enter Text</Button>{" "}
					{/* TODO delete note here and in backend and set pagestate to generate */}
					<SimpleButton as="a" href={`/decks/${deckID}`}>
						Cancel
					</SimpleButton>
				</ContentWidthConstraint>
			);
			break;
	}

	const matches = useMediaQuery("(max-width: 500px)");

	const PageHeader = (
		<>
			<Text className={style.align_left}>{deck.name}</Text>
			<Spacer spacing={matches ? 2 : 4} />
			<ProgressIndicator currentState={pageStateOrder[pageState]} />
			<Spacer spacing={matches ? 4 : 8} />
		</>
	);

	return (
		<Modal>
			<ModalLayout
				width={"full"}
				onClose={pageState === pageStates.EDIT ? onCloseEdit : onClose}
			>
				<PagePadding>{PageHeader}</PagePadding>
				{Component}
			</ModalLayout>
		</Modal>
	);
};

export default CardGeneration;
