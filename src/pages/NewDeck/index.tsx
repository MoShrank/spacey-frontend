import { createDeckAction } from "actions/deck";
import EditableDeck from "components/EditableDeck";
import EditableWebContent from "components/EditableWebContent/EditableWebContent";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import { useNavigate } from "react-router-dom";

enum InputTypes {
	DECK = "deck",
	WEB_CONTENT = "url",
}

const TypeComponentMapping = {
	[InputTypes.DECK]: (
		<EditableDeck
			submitAction={createDeckAction}
			buttonName="Create Deck"
			formTitle="Create Deck"
			redirectOnSubmit="/"
		/>
	),
	[InputTypes.WEB_CONTENT]: <EditableWebContent />,
};

const NewDeck = () => {
	const navigate = useNavigate();

	let type = new URLSearchParams(window.location.search).get("type");

	if (!type) type = InputTypes.DECK;
	else if (!Object.values(InputTypes).includes(type as InputTypes))
		type = InputTypes.DECK;

	return (
		<Modal>
			<ModalLayout onClose={() => navigate("/")}>
				{TypeComponentMapping[type as InputTypes]}
			</ModalLayout>
		</Modal>
	);
};

export default NewDeck;
