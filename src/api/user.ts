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

export const fetchUserData = async (): Promise<UserI | null> => {
	const data = (await API.GET("user")) as UserI;
	return data;
};

export const sendVerificationEmail = async (): Promise<void> => {
	await API.GET("user/validate", {});
};

export const verifyEmail = async (token: string): Promise<void> => {
	await API.POST("user/validate", { token });
};
