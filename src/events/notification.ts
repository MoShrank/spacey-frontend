import EventEmitter from "events";

export interface NotificatorI {
	type: "ERROR" | "INFO";
	payload: Record<string, string>;
}

class Notificator {
	private static event: EventEmitter;
	private static onEvent: undefined | ((notification: NotificatorI) => void);

	public static init() {
		Notificator.event = new EventEmitter();
		Notificator.event.addListener("notification", Notificator.onNotification);
	}

	private static onNotification(notification: NotificatorI) {
		if (Notificator.onEvent) Notificator.onEvent(notification);
	}

	public static subscribe(onNotification: (notification: NotificatorI) => void) {
		Notificator.onEvent = onNotification;
	}

	public static unsubcribe() {
		Notificator.onEvent = undefined;
	}

	public static push(notification: NotificatorI) {
		Notificator.event.emit("notification", notification);
	}
}

Notificator.init();

export default Notificator;
