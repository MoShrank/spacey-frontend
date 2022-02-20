import Cookies from "universal-cookie";

export const getLoggedInState = (): boolean => {
	const cookies = new Cookies();

	return cookies.get("LoggedIn");
};

export const getHasSeenCookie = (): boolean => {
	const cookies = new Cookies();

	return cookies.get("HasSeenCookie");
};

export const createHasSeenCookie = (): void => {
	const cookies = new Cookies();

	cookies.set("HasSeenCookie", true);
};
