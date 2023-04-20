import { takeLatest, fork } from "redux-saga/effects";
import ACTIONS from "./UserActionTypes";
import { Store } from "../../Config/Store";
import axios from "axios";

function* getUser(action) {
    const { dispatch } = Store;
    console.log(action.payload);
    try {
        axios
            .get("/api/current_user")
            .then((res) => {
                
                dispatch({
                    type: ACTIONS.FETCH_USER_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    if (localStorage.getItem("token")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        window.location.pathname = "/";
                    }
                    dispatch({
                        type: ACTIONS.FETCH_USER_FAIL,
                    });
                }
            });
    } catch (error) {
        dispatch({
            type: ACTIONS.FETCH_USER_FAIL,
        });
        console.log("get shop error: ", error);
    }
}

function* watchUsers() {
    yield takeLatest(ACTIONS.FETCH_USER_REQUEST, getUser);
}

// ACTION WATCHER
export default function* userSaga() {
    yield fork(watchUsers);
}
