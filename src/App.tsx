import AppRoutes from "AppRoutes";
import { getDecksAction, getNotesAction } from "actions/deck";
import { getUserDataAction } from "actions/user";
import { getWebContentAction } from "actions/webContent";
import CookieBanner from "components/CookieBanner";
import Loader from "components/Loader";
import Notification from "components/Notification";
import Notificator, { NotificatorI } from "events/notification";
import useAction from "hooks/useAction";
import { useStore } from "hooks/useStore";
import { useEffect, useState } from "react";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { UserI } from "types/user";
import { WebEntryI } from "types/web_entry";
import { createHasSeenCookie } from "util/user";

import "./App.scss";

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

	const [, , fetchWebContentAction] = useAction<WebEntryI[]>(
		state => state.webContent,
		getWebContentAction,
	);

	const { notes } = useStore();

	useEffect(() => {
		const initData = async () => {
			if (isLoggedIn) {
				setLoading(true);
				const user = await fetchUserAction();

				const promises = [];

				if (user?.emailValidated) {
					promises.push(fetchDecksAction());
					promises.push(fetchWebContentAction());
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
			<AppRoutes />
		</>
	);
};

export default App;
