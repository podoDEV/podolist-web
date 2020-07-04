import { call, takeLatest, put, select } from "redux-saga/effects";
import Router from "next/router";
import { AnyAction } from "redux";
import { login, fetchUserInfo, checkValidUser } from "../../service/login";
import { applyUserInfo, USER_LOGIN, CHECK_VALID_USER, FETCH_USER_INFO } from "../actions/user";

function* userLoginSaga(action: AnyAction) {
  try {
    const { user } = yield call(login, action.accessToken);

    if (user) {
      yield put(applyUserInfo(user));
      yield Router.push("/todo");
    } else {
      alert("🔥 로그인 실패 🔥");
    }
  } catch (err) {
    console.error(err);
  }
}

function* fetchUserInfoSaga() {
  try {
    const data = yield call(fetchUserInfo);
    if (data) {
      yield put(applyUserInfo(data));
    }
  } catch (err) {
    console.error(err);
  }
}

function* checkValidUserSaga(action: AnyAction) {
  try {
    const { callback } = action;
    const { pathname } = Router;
    const res = yield call(checkValidUser);
    if (res.status === 401) {
      if (pathname === "/todo") {
        Router.push("/", undefined, { shallow: true });
      } else if (callback) {
        callback();
      }
    } else if (res) {
      if (pathname === "/") {
        Router.push("/todo");
      }
      const { user } = yield select();
      if (!user) {
        yield fetchUserInfoSaga();
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
  yield takeLatest(CHECK_VALID_USER, checkValidUserSaga);
  yield takeLatest(FETCH_USER_INFO, fetchUserInfoSaga);
}
