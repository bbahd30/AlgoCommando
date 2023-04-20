import ACTIONS from "./UserActionTypes";

const initialState = {
    user: {},
    loading: false,
    user_login: {},
};

const userReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch (action.type) {
        /** fetch all products start */

        case ACTIONS.SIGN_UP:
            return Object.assign({}, state, {
                user: payload,
            });

        case ACTIONS.FETCH_USER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
            });

        case ACTIONS.FETCH_USER_FAIL:
            return Object.assign({}, state, {
                loading: false,
            });

        case ACTIONS.FETCH_USER_SUCCESS:
            return Object.assign({}, state, {
                user: payload,
                loading: false,
            });

        case ACTIONS.SAVE_USER_LOGIN:
            return Object.assign({}, state, {
                user_login: payload,
            });

        case ACTIONS.LOGOUT:
            return Object.assign({}, state, {
                user: {},
            });

        default:
            return state;
    }
};

export default userReducer;
