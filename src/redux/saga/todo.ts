import { call, put, takeLatest, all } from "redux-saga/effects";
import { AnyAction } from "redux";
import {
  REMOVE_TODO,
  applyTodo,
  TOGGLE_TODO,
  toggleTodoItem,
  updateTodoItem,
  toggleTodoSuccess
} from "../actions/todo";
import { removeTodoItem, fetchTodo } from "../../service/todo";
import { TodoType } from "redux/reducers/todo";
import { updateTodoApi } from "components/todo-adder/TodoAdder";
import dayjs from "dayjs";

function* toggleTodoSaga(action: ReturnType<typeof toggleTodoItem>) {
  try {
    const { id, isCompleted } = action;
    const todo: TodoType = yield call(updateTodoApi, id, { isCompleted });

    const todoEndedAt = dayjs(todo.endedAt * 1000);
    const isDelayed = dayjs().isAfter(todoEndedAt, "date");

    if (isDelayed) {
      yield put(toggleTodoSuccess(id, todo, true));
    } else {
      yield put(updateTodoItem(todo, id, false));
    }
  } catch (err) {
    console.error(err);
  }
}

function* removeTodoSaga(action: AnyAction) {
  try {
    yield call(removeTodoItem, action.id);
    const res = yield call(fetchTodo, action.date);
    yield put(applyTodo(res));
  } catch (err) {
    console.error(err);
  }
}

export default function*() {
  all([
    yield takeLatest(TOGGLE_TODO, toggleTodoSaga),
    yield takeLatest(REMOVE_TODO, removeTodoSaga)
  ]);
}
