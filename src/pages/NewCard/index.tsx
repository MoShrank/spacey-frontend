import { createCardAction } from "actions/deck";
import Button from "components/Button";
import EditableCard from "components/EditableCard";
import Error from "components/Error";
import BottomContainer from "components/FormBottom";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import SimpleButton from "components/SimpleButton";
import Spacer from "components/Spacer";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

	const navigate = useNavigate();

	const [card, setCard] = useState({
		question: "",
		answer: "",
		deckID: deckID,
		id: `${Math.random()}`,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(card).then(() => {
			setCard({
				question: "",
				answer: "",
				deckID: deckID,
				id: `${Math.random()}`,
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

	const handleQuestionInput = (value: string) => {
		setCard({
			...card,
			question: value,
		});
	};

	const handleAnswerInput = (value: string) => {
		setCard({
			...card,
			answer: value,
		});
	};

	return (
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deck.id}`)}>
				<EditableCard
					deck={deck}
					onSubmit={handleSubmit}
					card={card}
					onQuestionInput={handleQuestionInput}
					onAnswerInput={handleAnswerInput}
				>
					<BottomContainer>
						{error && <Error>{error}</Error>}
						<Spacer spacing={4} />
						<Button loading={createCardLoading}>Create Card</Button>
						<SimpleButton as={Link} to={`/decks/${deck.id}`}>
							Cancel
						</SimpleButton>
					</BottomContainer>
				</EditableCard>
			</ModalLayout>
		</Modal>
	);
};

export default NewCard;
