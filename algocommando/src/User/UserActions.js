import ACTIONS from "./UserActionTypes";
import setAuthToken from "./setAuthToken";

export const login = (params = {}) => {
    console.log(params);
    localStorage.setItem("token", params.token);
    localStorage.setItem("userId", params.user?.user_id);
    setAuthToken(localStorage.getItem("token"));
    return {
        type: ACTIONS.SIGN_UP,
        payload: params.user,
    };
};

export const fetchUser = (params = {}) => {
    console.log("I AM HERE", params);
    return {
        type: ACTIONS.FETCH_USER_REQUEST,
        payload: params,
    };
};

export const saveUserLogin = (params = {}) => {
    return {
        type: ACTIONS.SAVE_USER_LOGIN,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.pathname = "/";
    return {
        type: ACTIONS.LOGOUT,
    };
};
