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
import useAction from "hooks/useAction";
import { useStore } from "hooks/useStore";
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
import Settings from "pages/Settings";
import SignUp from "pages/SignUp";
import TOS from "pages/TOS";
import VerifyEmail from "pages/VerifyEmail";
import VerifyingEmail from "pages/VerifyingEmail";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { UserI } from "types/user";
import { createHasSeenCookie } from "util/user";

import "./App.scss";

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
	const isLoggedIn = useStore(state => state.isLoggedIn);

	const [, , fetchUserAction] = useAction<UserI | null | undefined>(
		state => state.user,
		getUserDataAction,
	);
	const [, , fetchDecksAction] = useAction<DeckI[]>(
		state => state.decks,
		getDecksAction,
	);
	const [, , fetchNotesAction] = useAction<Record<string, NoteI>>(
		state => state.notes,
		getNotesAction,
	);

	const { decks, notes } = useStore();

	useEffect(() => {
		const initData = async () => {
			if (isLoggedIn) {
				setLoading(true);
				const user = await fetchUserAction();

				const promises = [];

				if (user?.emailValidated) {
					if (decks?.length) {
						fetchDecksAction();
					} else {
						promises.push(fetchDecksAction());
					}
				}
				if (user?.betaUser) {
					if (Object.values(notes).length) {
						fetchNotesAction();
					} else {
						promises.push(fetchNotesAction());
					}
				}
				await Promise.all(promises);
			}
			setLoading(false);
		};

		initData();
	}, [isLoggedIn]);

	return loading;
};

const App = () => {
	const [notifications, setNotifications] = useState<NotificatorI[]>([]);
	const { hasSeenCookie, setHasSeenCookie } = useStore(state => ({
		hasSeenCookie: state.hasSeenCookie,
		setHasSeenCookie: state.setHasSeenCookie,
	}));

	const pushNotification = async (newNotification: NotificatorI) => {
		setNotifications([...notifications, newNotification]);
	};

	useEffect(() => {
		Notificator.subscribe(pushNotification);
		() => Notificator.unsubcribe();
	}, [notifications]);

	const loading = useInitData();

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
						createHasSeenCookie();
						setHasSeenCookie();
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
				<Route
					path="settings"
					element={
						<RequireAuth needsEmailVerification={false}>
							<Settings />
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
