export const setLoginCookie = (token: string) => {
    document.cookie = `Authorization=Bearer ${token};max-age=604800;HttpOnly;SameSite=Strict;`;
};
