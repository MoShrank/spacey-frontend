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
import useActionZ from "hooks/useAction";
import useStore from "hooks/useStore";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

const NewCard = () => {
	const { deckID } = useParams();
	const deck = useStore(state => state.decks.find(({ id }) => id === deckID));

	const [createCardLoading, error, action] = useActionZ(
		state => state.decks,
		createCardAction,
	);

	const navigate = useNavigate();

	if (!deckID || !deck) return <Navigate to="404" />;

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
					key={card.id}
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
