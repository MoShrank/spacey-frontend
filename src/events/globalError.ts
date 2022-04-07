import EventEmitter from "events";

export interface PopupErrorI {
	msg: string;
	hint: string;
}

const PopupError = {
	TIMEOUT_ERROR: {
		msg: "Connection timeout.",
		hint: "Please check your internet connection and try again.",
	},
	HIT_RATE_LIMIT: {
		msg: "Too many request.",
		hint: "Please try again in a few minutes.",
	},
	UNKNOWN_ERROR: {
		msg: "Unknown error.",
		hint: "Please try again.",
	},
};

class GlobalError {
	private static error: EventEmitter;
	private static renderCallback: (val: PopupErrorI | undefined) => void;

	public static init() {
		GlobalError.error = new EventEmitter();
		GlobalError.error.addListener("error", GlobalError.onError);
	}

	private static onError(val: PopupErrorI) {
		if (typeof GlobalError.renderCallback !== "function") {
			return;
		}

		GlobalError.renderCallback(val);

		const timeoutTime = 5000;

		const progressNode = document.getElementById("bar");

		let width = 100;
		const interval = setInterval(() => {
			if (progressNode) {
				width = width - 0.2;
				progressNode.style.width = width + "%";
			}
		}, 10);

		setTimeout(() => {
			clearInterval(interval);
			GlobalError.renderCallback(undefined);
		}, timeoutTime);
	}

	public static emit(error: PopupErrorI) {
		GlobalError.error.emit("error", error);
	}

	public static setRenderCallback(
		callback: (val: PopupErrorI | undefined) => void,
	) {
		GlobalError.renderCallback = callback;
	}
}

GlobalError.init();

export default GlobalError;
export { PopupError };
