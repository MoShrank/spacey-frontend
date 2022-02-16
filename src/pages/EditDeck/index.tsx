import { deleteDeck, updateDeckAction } from "actions/deck";
import { getDecks } from "actions/deck";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import EditableDeck from "components/EditableDeck";
import Loader from "components/Loader";
import Text from "components/Text";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { DeckI } from "types/deck";

import style from "./style.module.scss";

const EditDeck = () => {
	const { deckID } = useParams();
	const [loading, , decks] = useAPIFetch("decks", getDecks);
	const [, , call] = useAction("decks", deleteDeck);

	const navigate = useNavigate();

	const deck = decks.find((d: DeckI) => d.id === deckID);

	const handleDelete = () => {
		call(deck?.id).then(() => navigate("/"));
	};

	if (loading) return <Loader />;
	if (!deck) return <Navigate to="/404" />;

	return (
		<EditableDeck
			submitAction={updateDeckAction}
			buttonName="Save Changes"
			deckPrefill={deck}
			redirectOnSubmit={`/decks/${deckID}`}
		>
			<div onClick={handleDelete} className={style.delete_deck_container}>
				<TrashIcon />
				<Text color="lightgrey">Delete this deck</Text>
			</div>
		</EditableDeck>
	);
};

export default EditDeck;
