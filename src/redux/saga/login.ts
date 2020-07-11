import { call, takeLatest, put } from "redux-saga/effects";
import Router from "next/router";
import { AnyAction } from "redux";
import { login, fetchUserInfo } from "../../service/login";
import { applyUserInfo, USER_LOGIN, FETCH_USER_INFO } from "../actions/user";

function* userLoginSaga(action: AnyAction) {
  try {
    const { user } = yield call(login, action.accessToken);

    if (user) {
      yield put(applyUserInfo(user));
      yield Router.push("/");
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

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
  yield takeLatest(FETCH_USER_INFO, fetchUserInfoSaga);
}
