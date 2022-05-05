import { NotificatorI } from "./notification";

export const PopupError: Record<string, NotificatorI> = {
	TIMEOUT_ERROR: {
		type: "ERROR",
		payload: {
			message: "Connection timeout.",
			hint: "Please check your internet connection and try again.",
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
