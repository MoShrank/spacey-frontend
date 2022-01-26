import "./style.scss";
import { getUserData } from "api/user";
import FloatingButton from "components/FloatingButton";
import Logout from "components/Logout";
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
            getDecks("").then((decks) => setDecks(decks));
        }
    }, [isLoggedIn]);

    return (
        <div className="deck_overview_container">
            <Logout />
            <div className="header_container">
                <h1 className="header">Your Decks</h1>
                <FloatingButton action={() => console.log("hello")} />
            </div>
            {decks.map((deck: DeckI) => (
                <Link to={`decks/${deck.id}`}>
                    <Deck key={deck.id} deck={deck} />
                </Link>
            ))}
        </div>
    );
};

export default Home;
