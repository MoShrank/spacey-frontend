import { PopupError } from "events/errorTypes";
import Notificator from "events/notification";
import { ValidationError } from "util/error";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

class API {
	private static _headers: Headers = new Headers({
		"Content-Type": "application/json",
		Accept: "application/json",
	});
	private static _baseUrl: string = process.env.REACT_APP_BASE_URL
		? process.env.REACT_APP_BASE_URL
		: "http://localhost:80";

	private static async Request(
		url: string,
		method: Method,
		params?: {
			queryParameters?: Record<string, string> | string[][];
			body?: unknown;
		},
	): Promise<unknown> {
		const { body, queryParameters } = params || {};

		const controller = new AbortController();

		setTimeout(() => {
			controller.abort();
		}, 60000);

		let res;

		const urlObj = new URL(`${this._baseUrl}/${url}`);
		urlObj.search = new URLSearchParams(queryParameters).toString();

		try {
			res = await fetch(urlObj.toString(), {
				method: method,
				headers: this._headers,
				body: JSON.stringify(body),
				credentials: "include",
				signal: controller.signal,
			});
		} catch (e) {
			if (
				e instanceof DOMException ||
				(e as Error).message === "Failed to fetch"
			) {
				Notificator.push(PopupError.TIMEOUT_ERROR);
			}
			throw new Error("timeout");
		}

		let resBody;

		try {
			resBody = await res.json();
		} catch (e) {
			Notificator.push(PopupError.UNKNOWN_ERROR);
			throw new Error("unknown error");
		}

		if (res.status >= 500) {
			Notificator.push(PopupError.TIMEOUT_ERROR);
			throw new Error(resBody.message || resBody.error);
		}

		if (res.status === 429) {
			Notificator.push(PopupError.HIT_RATE_LIMIT);
			throw new Error(resBody.message || resBody.error);
		}

		if (!res.ok) {
			if (Array.isArray(resBody.message)) {
				throw new ValidationError(resBody.message);
			}

			throw new Error(resBody.message || resBody.error);
		}

		return resBody.data;
	}

	static async GET(
		url: string,
		queryParameters?: Record<string, string> | string[][],
	): Promise<unknown> {
		return API.Request(url, "GET", { queryParameters });
	}

	static async POST(url: string, body: unknown): Promise<unknown> {
		return API.Request(url, "POST", { body });
	}

	static async PUT(url: string, body: unknown): Promise<unknown> {
		return API.Request(url, "PUT", { body });
	}
	static async DELETE(url: string): Promise<unknown> {
		return API.Request(url, "DELETE");
	}
}

export default API;
