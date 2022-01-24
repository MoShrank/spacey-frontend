import API from "./api";

interface UserI {
    name: string | null;
    email: string;
    password: string;
}

export const signup = async (user: UserI): Promise<UserI | null> => {
    try {
        const data = (await API.POST("user", user)) as UserI;

        return data;
    } catch (err) {
        return null;
    }
};

export const login = async (user: UserI): Promise<UserI | null> => {
    try {
        const data = (await API.POST("user/login", user)) as UserI;

        return data;
    } catch (error) {
        return null;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await API.GET("user/logout");
    } catch (error) {}
};

export const getUserData = async (): Promise<UserI | null> => {
    try {
        const data = (await API.GET("user")) as UserI;

        return data;
    } catch (error) {
        return null;
    }
};
