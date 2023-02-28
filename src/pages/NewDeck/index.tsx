import { createDeckAction } from "actions/deck";
import EditableDeck from "components/EditableDeck";
import EditableWebContent from "components/EditableWebContent/EditableWebContent";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

enum InputTypes {
	DECK = "deck",
	WEB_CONTENT = "web-content",
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
	const [selectedInputType, setSelectedInput] = useState<InputTypes>(
		InputTypes.DECK,
	);

	return (
		<Modal>
			<ModalLayout onClose={() => navigate("/")}>
				<select
					value={selectedInputType}
					onChange={e => setSelectedInput(e.target.value as InputTypes)}>
					<option value={InputTypes.DECK}>Deck</option>
					<option value={InputTypes.WEB_CONTENT}>Web Content</option>
				</select>
				{TypeComponentMapping[selectedInputType]}
			</ModalLayout>
		</Modal>
	);
};

export default NewDeck;
