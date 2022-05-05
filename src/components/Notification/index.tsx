import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark.svg";
import { ReactComponent as WarningIcon } from "assets/icons/infoTriangle.svg";
import PopupContainer from "components/GlobalPopup/PopupContainer";
import ContentHeader from "components/GlobalPopup/PopupHeader";
import Modal from "components/Modal";
import Spacer from "components/Spacer";
import Text from "components/Text";
import { NotificatorI } from "events/notification";
import useProgress from "hooks/useProgress";
import { useEffect } from "react";

import style from "./style.module.scss";

interface PayloadI {
	payload: Record<string, string>;
}

const ErrorContent = ({ payload }: PayloadI) => {
	const { message, hint } = payload;

	return (
		<>
			<ContentHeader>
				<WarningIcon />
				<Spacer direction="row" spacing={1} />
				<Text style={{ fontWeight: "bold" }}>{message}</Text>
			</ContentHeader>
			<Spacer spacing={1} />
			<Text color="lightgrey">{hint}</Text>
		</>
	);
};

const InfoContent = ({ payload }: PayloadI) => {
	const { message } = payload;

	return (
		<ContentHeader>
			<CheckmarkIcon />
			<Spacer direction="row" spacing={1} />
			<Text style={{ fontWeight: "bold" }}>{message}</Text>
		</ContentHeader>
	);
};

interface NotificationI {
	notifications: NotificatorI[];
	updateNotifications: (notifications: NotificatorI[]) => void;
}

const notificationTypeComponents = {
	INFO: InfoContent,
	ERROR: ErrorContent,
};

const timeConfig = {
	INFO: 2,
	ERROR: 3,
};

/*
Notification component that renders a popup with the notification message for x amount of seconds indicated by a progress bar.
Notifications are passed from the parent component. Currently, we are only interested in the latest notification whereas each time
a new notification is pushed we abort the old one and start a new one.
*/
const Notification = ({
	notifications,
	updateNotifications,
}: NotificationI) => {
	const controller = new AbortController();
	const { ref, startProgress } = useProgress(controller);
	const notification = notifications[notifications.length - 1];
	const { type, payload } = notification;
	const time = timeConfig[type];

	useEffect(() => {
		startProgress(time)
			.then(() => {
				updateNotifications([]);
			})
			.catch(
				() => undefined,
			); /* do nothing since promise has been aborted due to new notification */

		return () => {
			controller.abort();
		};
	}, [ref.current, notifications]);

	const ContentComponent = notificationTypeComponents[type];

	return (
		<Modal>
			<PopupContainer position="top">
				<ContentComponent payload={payload} />
				<span id="bar" ref={ref} className={style.bar} />
			</PopupContainer>
		</Modal>
	);
};

export default Notification;
