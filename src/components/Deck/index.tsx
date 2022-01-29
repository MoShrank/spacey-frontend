import "./style.scss";
import { DeckI } from "types/deck";
import FlashcardsIcon from "assets/icons/flashcards.png";

const Deck = (props: { deck: DeckI }) => {
    return (
        <div className="deck_container">
            <div
                style={{ background: props.deck.color }}
                className="deck_header"
            ></div>
            <div className="deck_body">
                <div className="text">{props.deck.name}</div>
                <div className="flashcards">
                    <img src={FlashcardsIcon} alt="flascards icon" />
                    <p>12 Flashcards</p>
                </div>
            </div>
        </div>
    );
};

export default Deck;
