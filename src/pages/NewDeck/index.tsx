import { createDeckAction } from "actions/deck";
import EditableDeck from "components/EditableDeck";

const NewDeck = () => {
	return (
		<EditableDeck
			submitAction={createDeckAction}
			buttonName="Create deck"
			formTitle="Create Deck"
		/>
	);
};

export default NewDeck;
