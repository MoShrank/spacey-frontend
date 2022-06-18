import { getDecksAction, getNotesAction } from "actions/deck";
import { getUserDataAction } from "actions/user";
import CookieBanner from "components/CookieBanner";
import Loader from "components/Loader";
import Navbar from "components/Navbar";
import Notification from "components/Notification";
import RedirectAuth from "components/RedirectAuth";
import RequireAuth from "components/RequireAuth";
import RequireBeta from "components/RequireBeta";
import Notificator, { NotificatorI } from "events/notification";
import Error404 from "pages/404";
import CardDetail from "pages/CardDetail";
import CardGeneration from "pages/CardGeneration";
import DeckDetail from "pages/DeckDetail/DeckDetail";
import EditDeck from "pages/EditDeck";
import GPT3Explanation from "pages/GP3Explanation";
import Home from "pages/Home";
import Imprint from "pages/Imprint";
import Learning from "pages/Learning";
import Login from "pages/Login";
import Logout from "pages/Logout";
import NewCard from "pages/NewCard";
import NewDeck from "pages/NewDeck";
import Privacy from "pages/Privacy";
import SignUp from "pages/SignUp";
import TOS from "pages/TOS";
import VerifyEmail from "pages/VerifyEmail";
import VerifyingEmail from "pages/VerifyingEmail";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { store } from "store/store";
import { useGlobalState } from "store/store";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { UserI } from "types/user";
import {
	createHasSeenCookie,
	getHasSeenCookie,
	getLoggedInState,
} from "util/user";

import "./App.scss";

type State = {
	isLoggedIn: boolean;
	hasSeenCookie: boolean;
	user: {
		id: string;
		name: string;
		email: string;
		betaUser: string;
	};
	decks: Array<DeckI>;
	notes: Record<string, NoteI>;
	config: {
		colors: Array<string>;
	};
	globalError: boolean;
};

const initialState: State = {
	isLoggedIn: getLoggedInState(),
	hasSeenCookie: getHasSeenCookie(),
	user: {
		id: "",
		name: "",
		email: "",
		betaUser: "",
	},
	notes: {},
	decks: [],
	config: {
		colors: [],
	},
	globalError: false,
};

store.init(initialState);

const Layout = () => {
	return (
		<div className="layout">
			<Navbar />
			<Outlet />
		</div>
	);
};

const useInitData = () => {
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
	const [user] = useGlobalState<UserI>("user");

	useEffect(() => {
		const loggedIn = getLoggedInState();
		setIsLoggedIn(loggedIn);

		if (isLoggedIn) {
			store.emit("user", getUserDataAction);
		} else {
			setLoading(false);
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (user.id) {
			if (user?.emailValidated) {
				const requests = [
					store.emit("notes", getNotesAction),
					store.emit("decks", getDecksAction),
				];

				Promise.allSettled(requests).then(() => setLoading(false));
			} else {
				setLoading(false);
			}
		}
	}, [user]);

	return [loading, user];
};

const App = () => {
	const [notifications, setNotifications] = useState<NotificatorI[]>([]);

	const [hasSeenCookie, setHasSeenCookie] = useGlobalState("hasSeenCookie");

	const pushNotification = async (newNotification: NotificatorI) => {
		setNotifications([...notifications, newNotification]);
	};

	useEffect(() => {
		Notificator.subscribe(pushNotification);
		() => Notificator.unsubcribe();
	}, [notifications]);

	const [loading] = useInitData();

	if (loading) return <Loader size="large" />;

	return (
		<>
			{!!notifications.length && (
				<Notification
					updateNotifications={setNotifications}
					notifications={notifications}
				/>
			)}
			{!hasSeenCookie && (
				<CookieBanner
					onClick={() => {
						setHasSeenCookie(true);
						createHasSeenCookie();
					}}
				/>
			)}
			<Routes>
				<Route
					path="/"
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path="/ai"
					element={
						<RequireAuth>
							<GPT3Explanation />
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
					path="/decks/:deckID/card/generate"
					element={
						<RequireAuth>
							<RequireBeta>
								<CardGeneration />
							</RequireBeta>
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
					path="verify-email"
					element={
						<RequireAuth needsEmailVerification={false}>
							<VerifyEmail />
						</RequireAuth>
					}
				/>
				<Route
					path="verifying"
					element={
						<RequireAuth needsEmailVerification={false}>
							<VerifyingEmail />
						</RequireAuth>
					}
				/>
				<Route path="/" element={<Layout />}>
					<Route
						path="/logout"
						element={
							<RequireAuth needsEmailVerification={false}>
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
				</Route>
				<Route path="*" element={<Error404 />} />
			</Routes>
		</>
	);
};

export default App;
