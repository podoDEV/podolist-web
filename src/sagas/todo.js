import {call, takeLatest, put, select} from 'redux-saga/effects';
import moment from 'moment';
import {
  FETCH_TODO,
  CREATE_TODO,
  REMOVE_TODO,
  setTodos,
  UPDATE_TODO,
  applyRemovedTodo,
  TOGGLE_ISCOMPLETED_TODO,
  applyToggleIsCompletedTodo,
  applyUpdatedTodo
} from '../actions/todo';
import history from '../browserHistory';
import {deleteItem, createItem, updateItem, toggleIsCompletedItem, getItemList} from '../service/todo';
import {logout} from '../service/login';

export default function*() {
  yield takeLatest(FETCH_TODO, fetchTodoSaga);
  yield takeLatest(CREATE_TODO, createTodoSaga);
  yield takeLatest(REMOVE_TODO, removeTodoSaga);
  yield takeLatest(UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TOGGLE_ISCOMPLETED_TODO, toggleIsCompletedTodoSaga);
}

export const handleError = (err) => {
  const errorCode = err.response.status;
  if (errorCode === 401) {
    // logout();
    // history.replace('/login');
    console.log('err handler develop mode');
  }
};

function getDateFormat(selectedDate, base) {
  return moment()
    .set('date', selectedDate)
    .add(base, 'M')
    .format('YYYYMMDD');
}

function* toggleIsCompletedTodoSaga(action) {
  try {
    const {itemId, isCompleted, isDelayed} = action;
    yield call(toggleIsCompletedItem, itemId, isCompleted);
    yield put(applyToggleIsCompletedTodo(itemId, isDelayed));
  } catch (err) {
    handleError(err);
  }
}

export function* fetchTodoSaga() {
  try {
    const {
      today: {selectedDate, base}
    } = yield select();
    const date = getDateFormat(selectedDate, base);
    const {data} = yield call(getItemList, date);

    yield put(setTodos(data));
  } catch (err) {
    handleError(err);
  }
}

function* createTodoSaga(action) {
  try {
    yield call(createItem, action.todo);
    yield fetchTodoSaga();
  } catch (err) {
    handleError(err);
  }
}

function* removeTodoSaga(action) {
  try {
    const {itemId, isDelayed} = action;
    yield call(deleteItem, itemId);
    yield put(applyRemovedTodo(itemId, isDelayed));
  } catch (err) {
    handleError(err);
  }
}

function* updateTodoSaga(action) {
  try {
    const {itemId, todo, isDelayed} = action;
    yield call(updateItem, itemId, todo);
    yield put(applyUpdatedTodo(itemId, todo, isDelayed));
    // reorder list
  } catch (err) {
    handleError(err);
  }
}
