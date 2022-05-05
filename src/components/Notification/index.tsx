import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark.svg";
import { ReactComponent as WarningIcon } from "assets/icons/infoTriangle.svg";
import PopupContainer from "components/GlobalPopup/PopupContainer";
import ContentHeader from "components/GlobalPopup/PopupHeader";
import Header from "components/Header";
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
				<Header kind="h3">{message}</Header>
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
			<Header kind="h3">{message}</Header>
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
	INFO: 1.5,
	ERROR: 2,
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
	const ContentComponent = notificationTypeComponents[type];
	const time = timeConfig[type];

	useEffect(() => {
		startProgress(time).then(() => {
			updateNotifications([]);
		});

		return () => {
			controller.abort();
		};
	}, [ref.current, notifications]);

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
