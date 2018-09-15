import {call, takeLatest, put} from 'redux-saga/effects';
import {FETCH_TODO, POST_TODO, REMOVE_TODO, setTodos} from '../actions/todo';
import {deleteItem, getItem, postItem} from '../service/todo';

export default function*() {
  yield takeLatest(FETCH_TODO, fetchTodoSaga);
  yield takeLatest(POST_TODO, addTodoSaga);
  yield takeLatest(REMOVE_TODO, removeTodoSaga);
}

function* fetchTodoSaga() {
  try {
    const {data} = yield call(getItem);
    yield put(setTodos(data));
  } catch (err) {
    console.error(err);
  }
}

function* addTodoSaga(action) {
  try {
    yield call(postItem, action.todo);
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* removeTodoSaga(action) {
  try {
    yield call(deleteItem, action.itemId);
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}
