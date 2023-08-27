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
import useActionZ from "hooks/useAction";
import useMediaQuery from "hooks/useMediaQuery";
import useStore from "hooks/useStore";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { next, prev } from "util/array";

import CardGenerationInput from "./CardGenerationInput";
import { CardReview } from "./CardReview";
import ProgressIndicator from "./ProgressIndicator";

enum pageStates {
	GENERATE = "generate",
	LOADING = "loading",
	REVIEW = "review",
	EDIT = "edit",
}

const pageStateOrder = {
	[pageStates.GENERATE]: 1,
	[pageStates.LOADING]: 2,
	[pageStates.REVIEW]: 3,
	[pageStates.EDIT]: 3,
};

const emptyCard = {
	card: {
		question: "",
		answer: "",
		source_start_index: 0,
		source_end_index: 0,
	},
	idx: -1,
};

const CardGeneration = () => {
	const { deckID } = useParams();
	const deck = useStore(state => state.decks.find(d => d.id === deckID));

	if (!deckID || !deck) return <Navigate to="404" />;

	const [note, setNote] = useState("");

	const [notes, setNotes] = useStore(state => [state.notes, state.setNotes]);
	const exiNote = notes[deckID];
	const [card, setCard] = useState(emptyCard);

	let cardDifferent;
	if (exiNote && card.idx !== -1) {
		const originalCard = exiNote.cards[card.idx];
		cardDifferent =
			originalCard.question !== card.card.question ||
			originalCard.answer !== card.card.answer;
	}

	const navigate = useNavigate();

	const [generatedLoading, generateError, generateCardsCall] = useActionZ(
		state => state.notes,
		generateCardsAction,
	);
	const [addLoading, addError, addGeneratedCardsCall] = useActionZ(
		state => state.decks,
		addGeneratedCardsAction,
	);
	const [updateLoading, updateError, updateCards] = useActionZ(
		state => state.notes,
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
			setPageState(pageStates.GENERATE);
		}
	};

	const onClickCard = (id: number) => {
		setCard({ card: { ...exiNote.cards[id] }, idx: id });
		setPageState(pageStates.EDIT);
	};

	const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newCards = exiNote.cards.map((c, idx) => {
			if (idx === card.idx) c = card.card;
			return c;
		});

		try {
			await updateCards(exiNote.id, deckID, exiNote.cards, card);
			setNotes({
				...notes,
				[deckID]: { ...exiNote, cards: newCards },
			});
			setPageState(pageStates.REVIEW);
			setCard(emptyCard);
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
		setCard({ card: { ...exiNote.cards[nextIdx] }, idx: nextIdx });
	};

	const handlePrev = () => {
		const prevIdx = prev(exiNote.cards, card.idx);
		setCard({ card: { ...exiNote.cards[prevIdx] }, idx: prevIdx });
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
		setCard(emptyCard);
	};

	const isMobile = useMediaQuery("(max-width: 500px)");

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

		case pageStates.REVIEW:
			Component = (
				<CardReview
					cardColor={deck.color}
					cards={exiNote.cards}
					text={exiNote.text}
					onClose={onClose}
					onClickCard={onClickCard}
					onClickAddCards={onClickAddCards}
					loading={addLoading}
					error={addError}
					isMobile={isMobile}
					noteID={exiNote.id}
					deckID={deckID}
				/>
			);
			break;

		case pageStates.EDIT:
			Component = (
				<ContentWidthConstraint>
					<EditableCard
						onSubmit={onSubmitEdit}
						card={{ id: `${card.idx}`, ...card.card }}
						deck={deck}
						onAnswerInput={e =>
							setCard({ ...card, card: { ...card.card, answer: e } })
						}
						onQuestionInput={e =>
							setCard({ ...card, card: { ...card.card, question: e } })
						}
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
	}

	const PageHeader = (
		<>
			<ProgressIndicator currentState={pageStateOrder[pageState]} />
			<Spacer spacing={isMobile ? 4 : 8} />
		</>
	);

	return (
		<Modal>
			<ModalLayout
				width="extendedFull"
				onClose={pageState === pageStates.EDIT ? onCloseEdit : onClose}
			>
				<PagePadding>{PageHeader}</PagePadding>
				{Component}
			</ModalLayout>
		</Modal>
	);
};

export default CardGeneration;
