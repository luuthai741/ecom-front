const authenUtils = {
    getRefreshToken: () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        return user.refreshToken;
    },
    getAccessToken: () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        return user.accessToken;
    },
    updateAccessToken: (accessToken) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        user.accessToken = accessToken;
        localStorage.setItem("userInfo", JSON.stringify(user));
    },
    getUser: () => {
        return JSON.parse(localStorage.getItem("userInfo"));
    },
    setUser: (user) => {
        return localStorage.setItem("userInfo", JSON.stringify(user));
    },
    removeUser: () => {
        localStorage.removeItem("userInfo");
    }
}