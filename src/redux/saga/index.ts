import { all, fork } from "redux-saga/effects";
import loginSaga from "./login";

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
