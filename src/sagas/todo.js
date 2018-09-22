import {call, takeLatest, put} from 'redux-saga/effects';
import {CHANGE_TODO_TITLE, FETCH_TODO, POST_TODO, REMOVE_TODO, setTodos, TOGGLE_TODO_COMPLETE} from '../actions/todo';
import {deleteItem, getItem, postItem, toggleCompleteItem, changeItemTitle} from '../service/todo';

export default function*() {
  yield takeLatest(FETCH_TODO, fetchTodoSaga);
  yield takeLatest(POST_TODO, addTodoSaga);
  yield takeLatest(REMOVE_TODO, removeTodoSaga);
  yield takeLatest(TOGGLE_TODO_COMPLETE, toggleTodoCompleteSaga);
  yield takeLatest(CHANGE_TODO_TITLE, changeTodoTitleSaga);
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

function* fetchTodoSaga() {
  try {
    const {data} = yield call(getItem);
    const todoList = separateTodos(data);
    yield put(setTodos(todoList));
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

function* toggleTodoCompleteSaga(action) {
  try {
    yield call(toggleCompleteItem, action.itemId, action.isCompleted);
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}

function* changeTodoTitleSaga(action) {
  try {
    yield call(changeItemTitle, action.itemId, action.title);
    yield fetchTodoSaga();
  } catch (err) {
    console.error(err);
  }
}
