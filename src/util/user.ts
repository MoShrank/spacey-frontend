export const setLoginCookie = (token: string) => {
    document.cookie = `Authorization=Bearer ${token};max-age=604800;HttpOnly;SameSite=Strict;`;
};

//TODO
export const getLoggedInState = (): boolean => {
    return false;
};
