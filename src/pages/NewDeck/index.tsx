import { useEffect, useState, useRef } from "react";
import { useGlobalState } from "store/store";
import { getConfig } from "api/config";
import useOnClickOutside from "hooks/useClickOutside";

import "./style.scss";
import { Link } from "react-router-dom";
import TextInput from "components/TextInput/TextInput";
import Button from "components/Button/Button";
import SecondaryButton from "components/SecondaryButton";
import ColorPopup from "components/ColorPopup";
import TextArea from "components/TextArea";

const NewDeck = () => {
    const [config, setConfig] = useGlobalState("config", {});
    const [colorsOpen, setColorsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => setColorsOpen(false));

    const [deck, setDeck] = useState({
        name: "",
        description: "",
        color: "",
    });

    useEffect(() => {
        getConfig().then((config) => {
            setConfig(config);
            setDeck({ ...deck, color: config.colors[0] });
        });
    }, []);

    return (
        <div className="create_deck_container">
            <form>
                <div
                    style={{ background: deck.color }}
                    className="color_header"
                >
                    <span ref={ref}>
                        <SecondaryButton
                            type="button"
                            onClick={() => setColorsOpen(!colorsOpen)}
                        >
                            change color
                        </SecondaryButton>
                        {colorsOpen && (
                            <div className="color_popup">
                                <ColorPopup
                                    colors={config.colors}
                                    selectedColor={deck.color}
                                    onClickColor={(color: string) =>
                                        setDeck({ ...deck, color })
                                    }
                                />
                            </div>
                        )}
                    </span>
                </div>
                <div className="input_container">
                    <TextInput
                        type="text"
                        placeholder="name"
                        value={deck.name}
                        error={""}
                        onChange={(e) =>
                            setDeck({ ...deck, name: e.target.value })
                        }
                    />
                    <TextArea
                        placeholder="description"
                        value={deck.description}
                        error={""}
                        maxLength={200}
                        onChange={(e) =>
                            setDeck({ ...deck, description: e.target.value })
                        }
                    />

                    <Button>Create Deck</Button>
                    <Link to="/">
                        <button className="simple_button">Cancel</button>
                    </Link>
                    {colorsOpen && (
                        <div className="input_container_overlay"></div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NewDeck;
