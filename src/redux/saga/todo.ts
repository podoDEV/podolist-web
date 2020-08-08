import { call, put, takeLatest, fork, all, select } from "redux-saga/effects";
import { AnyAction } from "redux";
import {
  UPDATE_TODO,
  REMOVE_TODO,
  applyTodo,
  TOGGLE_TODO,
  toggleTodoItem,
  addTodo,
  updateTodoItem,
  toggleTodoSuccess
} from "../actions/todo";
import { removeTodoItem, fetchTodo } from "../../service/todo";
import { IStore } from "redux/reducers";
import { TodoState, TodoType } from "redux/reducers/todo";
import { updateTodoApi } from "components/todo-adder/TodoAdder";
import dayjs from "dayjs";

function getTodoById(state: TodoState, id: number) {
  return (
    state.items.find(item => item.id === id) || state.delayedItems.find(item => item.id === id)
  );
}

function* toggleTodoSaga(action: ReturnType<typeof toggleTodoItem>) {
  try {
    const { id, isCompleted } = action;
    const todo: TodoType = yield call(updateTodoApi, id, { isCompleted });

    const todoEndedAt = dayjs(todo.endedAt * 1000);
    const isToday = dayjs().isSame(todoEndedAt, "date");

    if (isToday) {
      yield put(updateTodoItem(todo, id, false));
    } else {
      yield put(toggleTodoSuccess(id, todo, true));
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
  // yield takeLatest(UPDATE_TODO, updateTodoSaga);
  all([
    yield takeLatest(TOGGLE_TODO, toggleTodoSaga),
    yield takeLatest(REMOVE_TODO, removeTodoSaga)
  ]);
}
