import {call, takeLatest, put} from 'redux-saga/effects';
import {
  FETCH_TODO,
  CREATE_TODO,
  REMOVE_TODO,
  setTodos,
  UPDATE_TODO,
  applyRemovedTodo,
  TOGGLE_ISCOMPLETED_TODO,
  applyToggleIsCompletedTodo
} from '../actions/todo';
import {deleteItem, getItemList, createItem, updateItem, toggleIsCompletedItem} from '../service/todo';

export default function*() {
  yield takeLatest(FETCH_TODO, fetchTodoSaga);
  yield takeLatest(CREATE_TODO, createTodoSaga);
  yield takeLatest(REMOVE_TODO, removeTodoSaga);
  yield takeLatest(UPDATE_TODO, updateTodoSaga);
  yield takeLatest(TOGGLE_ISCOMPLETED_TODO, toggleIsCompletedTodoSaga);
}

function separateTodos(todos) {
  const separatedTodoList = {
    unfinishedTodoList: [],
    finishedTodoList: []
  };

  for (const todo of todos) {
    if (todo.isCompleted) {
      separatedTodoList.finishedTodoList.push(todo);
    } else {
      separatedTodoList.unfinishedTodoList.push(todo);
    }
  }

  return separatedTodoList;
}

function* toggleIsCompletedTodoSaga(action) {
  try {
    const {itemId, isCompleted} = action;
    // 작업중
    yield call(toggleIsCompletedItem, itemId, isCompleted);
    yield put(applyToggleIsCompletedTodo(itemId, isCompleted));
  } catch (err) {
    console.error(err);
  }
}

function* fetchTodoSaga() {
  try {
    const {data} = yield call(getItemList);
    const todoList = separateTodos(data);
    yield put(setTodos(todoList));
  } catch (err) {
    console.error(err);
  }
}

function* createTodoSaga(action) {
  try {
    yield call(createItem, action.todo);
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* removeTodoSaga(action) {
  try {
    const {itemId, isCompleted} = action;
    yield call(deleteItem, itemId);
    yield put(applyRemovedTodo(itemId, isCompleted));
  } catch (err) {
    console.error(err);
  }
}

function* updateTodoSaga(action) {
  try {
    yield call(updateItem, action.itemId, action.todo);
    // reorder list
  } catch (err) {
    console.error(err);
  }
}
