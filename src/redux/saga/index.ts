import { all, fork } from "redux-saga/effects";
import loginSaga from "./login";
import todoSaga from "./todo";

export default function* rootSaga() {
  yield all([fork(loginSaga), fork(todoSaga)]);
}
