import {takeLatest, put} from 'redux-saga/effects';
import moment from 'moment';
import {
  CHANGE_TODAY_BASE_SAGA,
  CHANGE_TODAY_DATE_SAGA,
  changeTodayBase,
  changeTodayDate,
  RESET_TODAY_SAGA
} from '../actions/today';
import {fetchTodoSaga} from './todo';
import {clearTodos} from '../actions/todo';

export default function*() {
  yield takeLatest(RESET_TODAY_SAGA, resetTodaySaga);
  yield takeLatest(CHANGE_TODAY_BASE_SAGA, changeTodayBaseSaga);
  yield takeLatest(CHANGE_TODAY_DATE_SAGA, changeTodayDateSaga);
}

function* resetTodaySaga() {
  try {
    yield put(changeTodayBase(0));
    yield put(changeTodayDate(Number(moment().format('D'))));

    yield clearTodos();
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* changeTodayBaseSaga({months}) {
  try {
    yield put(changeTodayBase(months));
    yield clearTodos();
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* changeTodayDateSaga({selectedDate}) {
  try {
    yield put(changeTodayDate(selectedDate));
    yield clearTodos();
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}
