import { getConfig } from "actions/config";
import { createDeckAction } from "actions/deck";
import Button from "components/Button";
import ColorPopup from "components/ColorPopup";
import SecondaryButton from "components/SecondaryButton";
import TextArea from "components/TextArea";
import TextInput from "components/TextInput";
import useAPIFetch from "hooks/useAPIFetch";
import useAction from "hooks/useAction";
import useOnClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const NewDeck = () => {
	const [loading, error, action] = useAction("decks", createDeckAction);
	const [, , config] = useAPIFetch("config", getConfig);

	const [colorsOpen, setColorsOpen] = useState(false);

	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement>(null);

	useOnClickOutside(ref, () => setColorsOpen(false));

	const [deck, setDeck] = useState({
		name: "",
		description: "",
		color: config.colors[0],
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		action(deck).then(() => navigate("/"));
	};

	useEffect(() => {
		if (config) {
			setDeck({ ...deck, color: config.colors[0] });
		}
	}, [config]);

	return (
		<div className="create_deck_container">
			<form onSubmit={handleSubmit}>
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
				{error && <p className="error">{error}</p>}
				<Button className="bottom" loading={loading} disabled={loading}>
					Create Deck
				</Button>
				<Link to="/">
					<button className="simple_button">Cancel</button>
				</Link>
				{colorsOpen && <div className="input_container_overlay"></div>}
			</form>
		</div>
	);
};

export default NewDeck;
