import CookieBanner from "components/CookieBanner";
import GlobalErrorPopup from "components/GlobalErrorPopup";
import Navbar from "components/Navbar";
import RedirectAuth from "components/RedirectAuth";
import RequireAuth from "components/RequireAuth";
import GlobalError from "events/globalError";
import Error404 from "pages/404";
import CardDetail from "pages/CardDetail";
import DeckDetail from "pages/DeckDetail/DeckDetail";
import EditDeck from "pages/EditDeck";
import Home from "pages/Home";
import Imprint from "pages/Imprint";
import Learning from "pages/Learning";
import LearningFinished from "pages/LearningFinished";
import Login from "pages/Login";
import Logout from "pages/Logout";
import NewCard from "pages/NewCard";
import NewDeck from "pages/NewDeck";
import NoLearning from "pages/NoLearning";
import Privacy from "pages/Privacy";
import SignUp from "pages/SignUp";
import TOS from "pages/TOS";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { store } from "store/store";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";
import {
	createHasSeenCookie,
	getHasSeenCookie,
	getLoggedInState,
} from "util/user";

import "./App.scss";

type State = {
	hand: "left" | "right";
	isLoggedIn: boolean;
	hasSeenCookie: boolean;
	user: {
		id: string;
		name: string;
		email: string;
	};
	decks: Array<DeckI>;
	config: {
		colors: Array<string>;
	};
	globalError: boolean;
};

const initialState: State = {
	hand: "right",
	isLoggedIn: getLoggedInState(),
	hasSeenCookie: getHasSeenCookie(),
	user: {
		id: "",
		name: "",
		email: "",
	},
	decks: [],
	config: {
		colors: [],
	},
	globalError: false,
};

store.init(initialState);

function Layout() {
	return (
		<div className="layout">
			<Navbar />
			<Outlet />
		</div>
	);
}

function App() {
	const [globalError, setGlobalError] = useGlobalState("globalError");
	const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
	const [hasSeenCookie, setHasSeenCookie] = useGlobalState("hasSeenCookie");

	useEffect(() => {
		GlobalError.setRenderCallback(setGlobalError);
	}, []);

	useEffect(() => {
		setIsLoggedIn(getLoggedInState());
	}, [isLoggedIn]);

	return (
		<>
			{globalError && <GlobalErrorPopup />}
			{!hasSeenCookie && (
				<CookieBanner
					onClick={() => {
						setHasSeenCookie(true);
						createHasSeenCookie();
					}}
				/>
			)}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						path="/"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/deck/new"
						element={
							<RequireAuth>
								<NewDeck />
							</RequireAuth>
						}
					/>
					<Route
						path="/decks/:deckID"
						element={
							<RequireAuth>
								<DeckDetail />
							</RequireAuth>
						}
					/>
					<Route
						path="/decks/:deckID/edit"
						element={
							<RequireAuth>
								<EditDeck />
							</RequireAuth>
						}
					/>
					<Route
						path="/decks/:deckID/card/new"
						element={
							<RequireAuth>
								<NewCard />
							</RequireAuth>
						}
					/>
					<Route
						path="/decks/:deckID/cards/:cardID"
						element={
							<RequireAuth>
								<CardDetail />
							</RequireAuth>
						}
					/>
					<Route
						path="/learn/:deckID"
						element={
							<RequireAuth>
								<Learning />
							</RequireAuth>
						}
					/>
					<Route
						path="/learn/:deckID/finished"
						element={
							<RequireAuth>
								<LearningFinished />
							</RequireAuth>
						}
					/>
					<Route
						path="/decks/:deckID/nolearning"
						element={
							<RequireAuth>
								<NoLearning />
							</RequireAuth>
						}
					/>
					<Route
						path="/logout"
						element={
							<RequireAuth>
								<Logout />
							</RequireAuth>
						}
					/>
					<Route
						path="login"
						element={
							<RedirectAuth>
								<Login />
							</RedirectAuth>
						}
					/>
					<Route
						path="signup"
						element={
							<RedirectAuth>
								<SignUp />
							</RedirectAuth>
						}
					/>
					<Route path="imprint" element={<Imprint />} />
					<Route path="tos" element={<TOS />} />
					<Route path="privacy" element={<Privacy />} />
					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
