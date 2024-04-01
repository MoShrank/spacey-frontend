import { getContentAction } from "actions/content";
import { getDecksAction, getNotesAction } from "actions/deck";
import { getUserDataAction } from "actions/user";
import Notificator from "events/notification";
import useAction from "hooks/useAction";
import { useStore } from "hooks/useStore";
import { useEffect, useState } from "react";

export const useInitData = () => {
	const [loading, setLoading] = useState(true);
	const isLoggedIn = useStore(state => state.isLoggedIn);

	const [, , fetchUserAction] = useAction(
		state => state.user,
		getUserDataAction,
	);
	const [, , fetchDecksAction] = useAction(state => state.decks, getDecksAction);
	const [, , fetchNotesAction] = useAction(state => state.notes, getNotesAction);

	const [, , fetchContentAction] = useAction(
		state => state.content,
		getContentAction,
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
					promises.push(fetchContentAction());
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
