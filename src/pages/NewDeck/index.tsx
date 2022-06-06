import { createDeckAction } from "actions/deck";
import EditableDeck from "components/EditableDeck";
import Modal from "components/Modal";
import ModalLayout from "components/ModalLayout";
import { useNavigate } from "react-router-dom";

const NewDeck = () => {
	const navigate = useNavigate();

	return (
		<Modal>
			<ModalLayout onClose={() => navigate("/")}>
				<EditableDeck
					submitAction={createDeckAction}
					buttonName="Create Deck"
					formTitle="Create Deck"
				/>
			</ModalLayout>
		</Modal>
	);
};

export default NewDeck;
