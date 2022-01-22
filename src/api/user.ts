import API from "./api";
import { setLoginCookie } from "../util/user";

interface UserI {
    name: string | null;
    email: string;
    password: string;
    token?: string;
}

export const signup = async (user: UserI): Promise<UserI | null> => {
    try {
        const data = (await API.POST("user/", user)) as UserI;
        setLoginCookie(data.token!);

        delete data.token;

        return data;
    } catch (err) {
        return null;
    }
};

export const login = async (user: UserI): Promise<UserI | null> => {
    try {
        const data = (await API.POST("user/login/", user)) as UserI;

        setLoginCookie(data.token!);
        delete data.token;

        return data;
    } catch (error) {
        return null;
    }
};
