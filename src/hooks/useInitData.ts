import { getDecksAction, getNotesAction } from "actions/deck";
import { getUserDataAction } from "actions/user";
import { getWebContentAction } from "actions/webContent";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import { useStore } from "hooks/useStore";
import { useEffect, useState } from "react";
import { DeckI } from "types/deck";
import { NoteI } from "types/note";
import { UserI } from "types/user";
import { WebEntryI } from "types/web_entry";

export const useInitData = () => {
	const [loading, setLoading] = useState(true);
	const isLoggedIn = useStore(state => state.isLoggedIn);

	const [, , fetchUserAction] = useAction<UserI>(
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

	useEffect(() => {
		const initData = async () => {
			if (isLoggedIn) {
				setLoading(true);
				const user = await fetchUserAction();

				if (!user) {
					setLoading(false);
					Notificator.push({
						payload: {
							message: "Error while fetching user data",
							hint:
								"Try logging in again or deleting your cookies and refreshing the page",
						},
						type: "ERROR",
					});

					return;
				}

				const promises = [];

				if (user.emailValidated) {
					promises.push(fetchDecksAction());
					promises.push(fetchWebContentAction());
				}
				if (user.emailValidated && user.betaUser) {
					promises.push(fetchNotesAction());
				}
				try {
					await Promise.all(promises);
				} catch (e) {
					// ignore errors
				}
			}
			setLoading(false);
		};

		initData();
	}, [isLoggedIn]);

	return loading;
};
