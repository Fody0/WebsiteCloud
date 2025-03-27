export const getCsrfToken = () => {
    const cookie = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return cookie ? cookie[1] : "";
};


