import { all, fork, select, take } from "redux-saga/effects";
import { IStore } from "redux/reducers";
import { DECREASE, INCREASE } from "../reducers/countReducer";

function* watchIncrease() {
  while (true) {
    yield take(INCREASE);
    const count: number = yield select((state: IStore) => state.count.data);
    console.log(`increase ${count - 1} to ${count}`);
  }
}

function* watchDecrease() {
  while (true) {
    yield take(DECREASE);
    const count: number = yield select((state: IStore) => state.count.data);
    console.log(`decrease ${count + 1} to ${count}`);
  }
}

export default function* countSaga() {
  yield all([fork(watchIncrease), fork(watchDecrease)]);
}
