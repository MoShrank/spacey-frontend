import { getConfig } from "actions/config";
import Button from "components/Button";
import ColorPopup from "components/ColorPopup";
import Form from "components/Form";
import FormBottom from "components/FormBottom";
import SecondaryButton from "components/SecondaryButton";
import SimpleButton from "components/SimpleButton";
import TextArea from "components/TextArea";
import TextInput from "components/TextInput";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import useOnClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeckI } from "types/deck";

import "./style.scss";

interface EditableDeckProps {
	submitAction: (deck: DeckI) => Promise<(curState: Array<DeckI>) => DeckI[]>;
	buttonName: "Create Deck" | "Save Changes";
	deckPrefill?: DeckI;
	children?: React.ReactNode;
}

const EditableDeck = ({
	submitAction,
	buttonName,
	deckPrefill,
	children,
}: EditableDeckProps) => {
	const [loading, error, action] = useAction("decks", submitAction);
	const [, , config] = useAPIFetch("config", getConfig);

	const [colorsOpen, setColorsOpen] = useState(false);

	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => setColorsOpen(false));

	const [deck, setDeck] = useState(
		deckPrefill || {
			name: "",
			description: "",
			color: config.colors[0],
		},
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(deck).then(() => navigate("/"));
	};

	useEffect(() => {
		if (config && !deck.color) {
			setDeck({ ...deck, color: config.colors[0] });
		}
	}, [config]);

	return (
		<Form onSubmit={handleSubmit}>
			<div style={{ background: deck.color }} className="color_header">
				<span ref={ref}>
					<SecondaryButton type="button" onClick={() => setColorsOpen(!colorsOpen)}>
						change color
					</SecondaryButton>
					{colorsOpen && (
						<div className="color_popup">
							<ColorPopup
								colors={config.colors}
								selectedColor={deck.color}
								onClickColor={(color: string) => setDeck({ ...deck, color })}
							/>
						</div>
					)}
				</span>
			</div>
			{colorsOpen && <div className="input_container_overlay"></div>}
			<TextInput
				type="text"
				placeholder="name"
				value={deck.name}
				error={error}
				onChange={e => setDeck({ ...deck, name: e.target.value })}
			/>
			<TextArea
				placeholder="description (optional)"
				value={deck.description}
				error={""}
				maxLength={200}
				onChange={e => setDeck({ ...deck, description: e.target.value })}
			/>
			<FormBottom>
				{error && <p className="error">{error}</p>}
				{children}
				<Button loading={loading} disabled={loading}>
					{buttonName}
				</Button>
				<SimpleButton to="/">Cancel</SimpleButton>
			</FormBottom>
		</Form>
	);
};

export default EditableDeck;
