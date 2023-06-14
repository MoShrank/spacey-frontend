import AppRoutes from "AppRoutes";
import CookieBanner from "components/CookieBanner";
import Loader from "components/Loader";
import Notification from "components/Notification";
import Notificator, { NotificatorI } from "events/notification";
import { useInitData } from "hooks/useInitData";
import { useStore } from "hooks/useStore";
import { useEffect, useState } from "react";
import { createHasSeenCookie } from "util/user";

import "./App.scss";

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
