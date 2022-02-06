import GlobalErrorPopup from "components/GlobalErrorPopup";
import Navbar from "components/Navbar";
import RedirectAuth from "components/RedirectAuth";
import RequireAuth from "components/RequireAuth";
import GlobalError from "events/globalError";
import Error404 from "pages/404";
import DeckDetail from "pages/DeckDetail/DeckDetail";
import Home from "pages/Home";
import Login from "pages/Login";
import Logout from "pages/Logout";
import NewCard from "pages/NewCard";
import NewDeck from "pages/NewDeck";
import SignUp from "pages/SignUp";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { store } from "store/store";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";
import { getLoggedInState } from "util/user";

import "./App.scss";

type State = {
	isLoggedIn: boolean;
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
	isLoggedIn: getLoggedInState(),
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

function NavbarLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}

function App() {
	/* using useGlobalState + conditional rendering depedent on that state
    somehow does not work and triggers and infinite rerendering */

	const [globalError, setGlobalError] = useGlobalState("globalError");
	const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
	useEffect(() => {
		GlobalError.setRenderCallback(setGlobalError);
	}, []);

	useEffect(() => {
		setIsLoggedIn(getLoggedInState());
	}, [isLoggedIn]);

	return (
		<div className="App">
			{isLoggedIn && <Navbar />}
			{globalError && <GlobalErrorPopup />}
			<div className="content">
				<Routes>
					<Route path="/" element={<NavbarLayout />}>
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
							path="/decks/:deckID/card/new"
							element={
								<RequireAuth>
									<NewCard />
								</RequireAuth>
							}
						/>
					</Route>
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
					<Route path="*" element={<Error404 />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
