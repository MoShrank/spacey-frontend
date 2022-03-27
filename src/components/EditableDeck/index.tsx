import { getConfig } from "actions/config";
import Button from "components/Button";
import ColorPopup from "components/ColorPopup";
import Form from "components/Form";
import BottomContainer from "components/FormBottom";
import SimpleButton from "components/SimpleButton";
import Text from "components/Text";
import TextArea from "components/TextArea";
import TextInput from "components/TextInput";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeckI } from "types/deck";

import "./style.scss";

const deckEq = (
	deck: { name: string; description: string; color: string } | undefined,
	newDeck: { name: string; description: string; color: string } | undefined,
) => {
	return (
		deck?.color === newDeck?.color &&
		deck?.name === newDeck?.name &&
		deck?.description === newDeck?.description
	);
};

interface EditableDeckProps {
	submitAction: (deck: DeckI) => Promise<(curState: Array<DeckI>) => DeckI[]>;
	buttonName: "Create deck" | "Save changes";
	formTitle: "Create Deck" | "Edit Deck";
	deckPrefill?: DeckI;
	children?: React.ReactNode;
	redirectOnSubmit?: string;
}

const EditableDeck = ({
	submitAction,
	buttonName,
	formTitle,
	deckPrefill,
	children,
	redirectOnSubmit,
}: EditableDeckProps) => {
	const [loading, error, action] = useAction("decks", submitAction);
	const [, , config] = useAPIFetch("config", getConfig);

	const navigate = useNavigate();

	redirectOnSubmit = redirectOnSubmit ?? "/";

	const [deck, setDeck] = useState(
		deckPrefill || {
			name: "",
			description: "",
			color: config.colors[0],
		},
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		action(deck).then(() => navigate(redirectOnSubmit as string));
	};

	useEffect(() => {
		if (config && !deck.color) {
			setDeck({ ...deck, color: config.colors[0] });
		}
	}, [config]);

	return (
		<Form onSubmit={handleSubmit}>
			<Text color="darkblue" className="title">
				{formTitle}
			</Text>
			<TextInput
				type="text"
				placeholder="name"
				value={deck.name}
				error={error}
				maxLength={30}
				onChange={e => setDeck({ ...deck, name: e.target.value })}
			/>
			<TextArea
				placeholder="description (optional)"
				value={deck.description}
				error={""}
				maxLength={200}
				onChange={e => setDeck({ ...deck, description: e.target.value })}
			/>
			<ColorPopup
				colors={config.colors}
				selectedColor={deck.color}
				onClickColor={(color: string) => setDeck({ ...deck, color })}
			/>
			<BottomContainer>
				{error && <p className="error">{error}</p>}
				{children}
				<Button loading={loading} disabled={loading || deckEq(deck, deckPrefill)}>
					{buttonName}
				</Button>
				<SimpleButton to={redirectOnSubmit}>Cancel</SimpleButton>
			</BottomContainer>
		</Form>
	);
};

export default EditableDeck;
