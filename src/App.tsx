import AppRoutes from "AppRoutes";
import MathJaxContext from "better-react-mathjax/MathJaxContext";
import CookieBanner from "components/CookieBanner";
import Loader from "components/Loader";
import Notification from "components/Notification";
import Notificator, { NotificatorI } from "events/notification";
import { useInitData } from "hooks/useInitData";
import usePoolForPDFs from "hooks/usePoolForPDFs";
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
	usePoolForPDFs();

	if (loading) return <Loader size="large" />;

	return (
		<MathJaxContext>
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
		</MathJaxContext>
	);
};

export default App;
