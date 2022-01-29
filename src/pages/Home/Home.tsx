import "./style.scss";
import { getUserData } from "api/user";
import FloatingButton from "components/FloatingButton";
import { useEffect } from "react";
import { useGlobalState } from "store/store";
import { getDecks } from "api/deck";
import Deck from "components/Deck";
import { DeckI } from "types/deck";
import { Link } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useGlobalState("user");
    const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");

    const [decks, setDecks] = useGlobalState("decks", []);

    useEffect(() => {
        if (isLoggedIn) {
            getUserData().then((user) => {
                setUser(user);
            });
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            getDecks().then((decks) => setDecks(decks));
        }
    }, [isLoggedIn]);

    return (
        <div className="deck_overview_container">
            <div className="header_container">
                <h1 className="header">Your Decks</h1>
            </div>
            <div className="decks_container">
                {decks.map((deck: DeckI) => (
                    <Link key={deck.id} to={`decks/${deck.id}`}>
                        <Deck deck={deck} />
                    </Link>
                ))}
            </div>
            <Link className="floating_container" to="/new/deck">
                <FloatingButton />
            </Link>
        </div>
    );
};

export default Home;
