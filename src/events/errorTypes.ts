import { NotificatorI } from "./notification";

export const PopupError: Record<string, NotificatorI> = {
	TIMEOUT_ERROR: {
		type: "ERROR",
		payload: {
			message: "Timeout error.",
			hint: "The server took too long to respond. Please try again.",
		},
	},
	INTERNAL_SERVER_ERROR: {
		type: "ERROR",
		payload: {
			message: "Server Error.",
			hint: "Upps, something went wrong. Please try again.",
		},
	},
	HIT_RATE_LIMIT: {
		type: "ERROR",
		payload: {
			message: "Too many request.",
			hint: "Please try again in a few minutes.",
		},
	},
	UNKNOWN_ERROR: {
		type: "ERROR",
		payload: {
			message: "Unknown error.",
			hint: "Please try again.",
		},
	},
};
