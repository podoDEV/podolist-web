import { all, fork } from "redux-saga/effects";
import countSaga from "./countSaga";

export default function* rootSaga() {
  yield all([fork(countSaga)]);
}
