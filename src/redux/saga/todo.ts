import { call, put, takeLatest, fork, all, select } from "redux-saga/effects";
import { AnyAction } from "redux";
import { UPDATE_TODO, REMOVE_TODO, applyTodo, TOGGLE_TODO, toggleTodoItem } from "../actions/todo";
import { removeTodoItem, fetchTodo } from "../../service/todo";
import { IStore } from "redux/reducers";
import { TodoState } from "redux/reducers/todo";
import { updateTodoApi } from "components/todo-adder/TodoAdder";

function getTodoById(state: TodoState, id: number) {
  return (
    state.items.find(item => item.id === id) && state.delayedItems.find(item => item.id === id)
  );
}

function* toggleTodoSaga(action: ReturnType<typeof toggleTodoItem>) {
  try {
    const { id } = action;
    const todoState = yield select((state: IStore) => state.todo);
    const todo = getTodoById(todoState, id);
    if (todo) {
      const response = yield call(updateTodoApi, id, { ...todo });
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
