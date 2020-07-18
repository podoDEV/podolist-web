import { call, put, takeLatest } from "redux-saga/effects";
import { AnyAction } from "redux";
import { UPDATE_TODO, REMOVE_TODO, applyTodo } from "../actions/todo";
import { removeTodoItem, fetchTodo } from "../../service/todo";

// function* updateTodoSaga(action: AnyAction) {
//   try {
//   } catch (err) {
//     console.error(err);
//   }
// }

function* removeTodoSaga(action: AnyAction) {
  try {
    yield call(removeTodoItem, action.id);
    const res = yield call(fetchTodo, action.date);
    yield put(applyTodo(res));

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  // yield takeLatest(UPDATE_TODO, updateTodoSaga);
  yield takeLatest(REMOVE_TODO, removeTodoSaga);
}
