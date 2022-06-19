import { deleteDeck, updateDeckAction } from "actions/deck";
import DeleteDialog from "components/DeleteDialog";
import EditableDeck from "components/EditableDeck";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import Spacer from "components/Spacer";
import useActionZ from "hooks/useActionZ";
import useStore from "hooks/useStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DeckI } from "types/deck";

const EditDeck = () => {
	const { deckID } = useParams();
	const deck = useStore(state =>
		state.decks.find((d: DeckI) => d.id === deckID),
	);
	const [, , deleteDeckAction] = useActionZ(state => state.decks, deleteDeck);

	const navigate = useNavigate();

	if (!deck) return <Navigate to="/404" />;

	const handleDelete = () => {
		deleteDeckAction(deck.id).then(() => navigate("/"));
	};

	return (
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deckID}`)}>
				<EditableDeck
					submitAction={updateDeckAction}
					buttonName="Save Changes"
					formTitle="Edit Deck"
					deckPrefill={deck}
					redirectOnSubmit={`/decks/${deckID}`}>
					<DeleteDialog onDelete={handleDelete}>Delete this Deck</DeleteDialog>
					<Spacer spacing={2} />
				</EditableDeck>
			</ModalLayout>
		</Modal>
	);
};

export default EditDeck;
