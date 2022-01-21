import API from "./api";

interface UserI {
    name: string | null;
    email: string;
    password: string;
}

export const signup = async (user: UserI): Promise<boolean> => {
    const response = await API.POST("user", user);

    return response.status === 201;
};

export const login = async (user: UserI): Promise<boolean> => {
    try {
        const response = await API.POST("user/login", user);
        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;
            document.cookie = `Authorization=Bearer ${token};max-age=604800;HttpOnly;SameSite=Strict;`;
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};
