import Cookies from "universal-cookie";

export const getLoggedInState = (): boolean => {
    const cookies = new Cookies();

    return cookies.get("LoggedIn");
};
