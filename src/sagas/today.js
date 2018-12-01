import {takeLatest, put} from 'redux-saga/effects';
import {CHANGE_TODAY_BASE_SAGA, CHANGE_TODAY_DATE_SAGA, changeTodayBase, changeTodayDate} from '../actions/today';
import {fetchTodoSaga} from './todo';

export default function*() {
  yield takeLatest(CHANGE_TODAY_BASE_SAGA, changeTodayBaseSaga);
  yield takeLatest(CHANGE_TODAY_DATE_SAGA, changeTodayDateSaga);
}

function* changeTodayBaseSaga({months}) {
  try {
    yield put(changeTodayBase(months));
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* changeTodayDateSaga({selectedDate}) {
  try {
    yield put(changeTodayDate(selectedDate));
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}
