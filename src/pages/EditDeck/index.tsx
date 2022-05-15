import { deleteDeck, updateDeckAction } from "actions/deck";
import { getDecksAction } from "actions/deck";
import DeleteDialog from "components/DeleteDialog";
import EditableDeck from "components/EditableDeck";
import Loader from "components/Loader";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DeckI } from "types/deck";

const EditDeck = () => {
	const { deckID } = useParams();
	const [loading, , decks] = useAPIFetch("decks", getDecksAction);
	const [, , call] = useAction("decks", deleteDeck);

	const navigate = useNavigate();

	const deck = decks.find((d: DeckI) => d.id === deckID);

	const handleDelete = () => {
		call(deck?.id).then(() => navigate("/"));
	};

	if (loading) return <Loader size="large" />;
	if (!deck) return <Navigate to="/404" />;

	return (
		<Modal>
			<ModalLayout onClose={() => navigate(`/decks/${deckID}`)}>
				<EditableDeck
					submitAction={updateDeckAction}
					buttonName="Save changes"
					formTitle="Edit Deck"
					deckPrefill={deck}
					redirectOnSubmit={`/decks/${deckID}`}
				>
					<DeleteDialog onDelete={handleDelete}>Delete this Deck</DeleteDialog>
				</EditableDeck>
			</ModalLayout>
		</Modal>
	);
};

export default EditDeck;
