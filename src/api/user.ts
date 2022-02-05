import { UserI } from "types/user";

import API from "./api";

export const signup = async (user: UserI): Promise<UserI | null> => {
	const data = (await API.POST("user", user)) as UserI;

	return data;
};

export const login = async (user: UserI): Promise<UserI | null> => {
	const data = (await API.POST("user/login", user)) as UserI;

	return data;
};

export const logout = async (): Promise<void> => {
	await API.GET("user/logout");
};

export const getUserData = async (): Promise<UserI | null> => {
	const data = (await API.GET("user")) as UserI;

	return data;
};
