import Button from "components/Button";
import ContentWidthConstraint from "components/ContentWidthConstraint";
import DeleteDialog from "components/DeleteDialog";
import EditableCard from "components/EditableCard";
import Error from "components/Error";
import BottomContainer from "components/FormBottom";
import Select from "components/Input/Select";
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import PagePadding from "components/PagePadding";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Swiper from "components/Swiper";
import Text from "components/Text";
import useMediaQuery from "hooks/useMediaQuery";
import useStore from "hooks/useStore";
import React, { useEffect, useState } from "react";
import {
	Navigate,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { DeckI } from "types/deck";

import CardGenerationInput from "./CardGenerationInput";
import { CardReview } from "./CardReview";
import ProgressIndicator from "./ProgressIndicator";
import useCreateNote from "./useCreateNote";
import useGeneratedCards from "./useGeneratedCards";

enum pageStates {
	CHOOSE_DECK = "choose_deck",
	GENERATE = "generate",
	LOADING = "loading",
	REVIEW = "review",
	EDIT = "edit",
}

const pageStateOrder = {
	[pageStates.CHOOSE_DECK]: 0,
	[pageStates.GENERATE]: 1,
	[pageStates.LOADING]: 2,
	[pageStates.REVIEW]: 3,
	[pageStates.EDIT]: 3,
};

const getInitialPageState = (deck?: DeckI, noteText?: string) => {
	if (!deck) return pageStates.CHOOSE_DECK;
	else if (noteText) return pageStates.REVIEW;
	else return pageStates.GENERATE;
};

const CardGeneration = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const deckID = searchParams.get("deckID");
	const decks = useStore(state => state.decks);
	const deck = decks.find(deck => deck.id === deckID);

	const {
		note,
		noteInput,
		setNoteText,
		handleGenerateCards,
		handleAddCards,
		addError,
		addLoading,
		error: noteError,
	} = useCreateNote(deckID);

	const {
		selectedCard,
		setQuestion,
		setAnswer,
		selectedCardIdx,
		isCardDifferent,
		loading: generatedCardsLoading,
		error: generatedCardsError,
		handleSelectCard,
		handleEditCards,
		handleDeleteCard,
		handleNextCard,
		handlePrevCard,
	} = useGeneratedCards(note, deckID);

	const location = useLocation();

	useEffect(() => {
		const locationState = (location.state as { text: string }) || undefined;

		if (locationState?.text) setNoteText(locationState.text);
	}, [location]);

	const navigate = useNavigate();

	const initialPageState = getInitialPageState(deck, note.text);
	const [pageState, setPageState] = useState<pageStates>(initialPageState);

	const onGenerateCards = async (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		try {
			setPageState(pageStates.LOADING);
			await handleGenerateCards();
			setPageState(pageStates.REVIEW);
		} catch (e) {
			setPageState(pageStates.GENERATE);
		}
	};

	const onSelectCard = (id: number) => {
		handleSelectCard(id);
		setPageState(pageStates.EDIT);
	};

	const onEditCard = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleEditCards();
		setPageState(pageStates.REVIEW);
	};

	const onClickAddCards = () => {
		setPageState(pageStates.LOADING);
		handleAddCards().then(() => navigate(`/decks/${deckID}`));
	};

	const onClose = (e?: React.MouseEvent<HTMLElement>) => {
		if (e) e.preventDefault();
		const to = deckID ? `/decks/${deckID}` : -1;
		// eslint-disable-next-line
		// @ts-ignore
		navigate(to);
	};

	const onCloseEdit = (e?: React.MouseEvent<HTMLElement>) => {
		if (e) e.preventDefault();
		setPageState(pageStates.REVIEW);
	};

	const onDeleteCard = () => {
		handleDeleteCard();
		setPageState(pageStates.REVIEW);
	};

	const onSelectDeckID = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// find deckID by idx
		const idx = e.target.value as unknown as number;
		const deckID = decks[idx].id;
		setSearchParams({ deckID });
	};

	// TODO handle case when note already exists
	const onSubmitDeck = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPageState(pageStates.GENERATE);
	};

	const isMobile = useMediaQuery("(max-width: 500px)");

	let Component = <Navigate to="/404" />;

	switch (pageState) {
		case pageStates.CHOOSE_DECK:
			Component = (
				<ContentWidthConstraint>
					<form
						onSubmit={onSubmitDeck}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Select
							options={decks.map(deck => deck.name)}
							onChange={onSelectDeckID}
						/>
						<Spacer spacing={3} />
						<Button>Next</Button>
					</form>
				</ContentWidthConstraint>
			);
			break;

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
					onSubmit={onGenerateCards}
					setNote={setNoteText}
					note={noteInput}
					error={noteError}
				/>
			);
			break;

		case pageStates.REVIEW:
			if (!deck || !deckID) return <Navigate to="/404" />;

			Component = (
				<CardReview
					cardColor={deck.color}
					cards={note.cards}
					text={noteInput}
					onClose={onClose}
					onClickCard={onSelectCard}
					onClickAddCards={onClickAddCards}
					loading={addLoading}
					error={addError}
					isMobile={isMobile}
					noteID={note.id}
					deckID={deckID}
				/>
			);
			break;

		case pageStates.EDIT:
			if (!deck) return <Navigate to="/404" />;

			Component = (
				<ContentWidthConstraint>
					<EditableCard
						onSubmit={onEditCard}
						card={{ ...selectedCard, id: `${selectedCardIdx}` }}
						deck={deck}
						onAnswerInput={e => setAnswer(e)}
						onQuestionInput={e => setQuestion(e)}
					>
						{generatedCardsError && <Error>{generatedCardsError}</Error>}
						<Spacer spacing={3} />
						<DeleteDialog onDelete={onDeleteCard}>Delete Card</DeleteDialog>
						<Spacer spacing={3} />
						<Swiper handleNext={handleNextCard} handlePrev={handlePrevCard}>
							card {selectedCardIdx != null ? selectedCardIdx + 1 : 0} of{" "}
							{note.cards.length}
						</Swiper>
						<Spacer spacing={3} />
						<BottomContainer>
							<Button loading={generatedCardsLoading} disabled={!isCardDifferent}>
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
