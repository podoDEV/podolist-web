import {call, takeLatest, put, select} from 'redux-saga/effects';
import moment from 'moment';
import _ from 'lodash';
import {
  FETCH_TODO,
  CREATE_TODO,
  REMOVE_TODO,
  setTodos,
  UPDATE_TODO,
  applyRemovedTodo,
  TOGGLE_ISCOMPLETED_TODO,
  applyToggleIsCompletedTodo,
  applyUpdatedTodo,
  moveTodoList
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

const isFuture = (todos, itemId) => {

  const selectedTodo = _.find(todos.items, (item) => item.id === itemId);
  return selectedTodo.endedAt * 1000 > moment();
};

export const handleError = (err) => {
  const errorCode = err.response.status;
  if (errorCode === 401) {
    logout();
    history.replace('/login');
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
    // @TODO: refactoring 시 중복 제거 필요
    const {
      today: {selectedDate, base},
      todos
    } = yield select();

    const date = moment()
      .set('date', selectedDate)
      .add(base, 'M')
      .format('YYYY.MM.DD');
    const today = moment().format('YYYY.MM.DD');
    const isToday = date === today;
    let isFutureTodo = false;

    if (isCompleted && !isDelayed) {
      isFutureTodo = isFuture(todos, itemId);
    }

    if (isToday) {
      yield put(applyToggleIsCompletedTodo(itemId, isDelayed));
      if (isFutureTodo) {
        yield put(applyRemovedTodo(itemId, isDelayed));
      } else {
        yield put(moveTodoList(itemId, isCompleted));
      }
    } else {
      yield put(applyRemovedTodo(itemId, isDelayed));
    }

    yield call(toggleIsCompletedItem, itemId, isCompleted);
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

    // reorder list
    const {
      today: {selectedDate, base},
      todos
    } = yield select();

    // const date = moment()
    //   .set('date', selectedDate)
    //   .add(base, 'M')
    //   .format('YYYY.MM.DD');
    // const today = moment().format('YYYY.MM.DD');
    // const isToday = date === today;
    // let isFutureTodo = false;
    // let isEditDate;

    if (isDelayed) {
      console.log('hi!');
      // const pastTodo = _.find(todos.delayedItems, (item) => item.id === itemId);
      // console.log(pastTodo, todo, 'ho?');
    } else {
      // isFutureTodo = isFuture(todos, itemId);
      // const pastTodo = _.find(todos.items, (item) => item.id === itemId);
      // console.log(pastTodo, todo, 'bnnno?');
    }

    yield put(applyUpdatedTodo(itemId, todo, isDelayed));

    // if (isToday) {
    // } else {
    //   // 2. false(미래)
    //   // 2.1. 수정시 사라진다.
    //   // 날짜 바뀌었을 경우
    //   yield put(applyRemovedTodo(itemId, isDelayed));
    // }

    // isToday 확인
    // 0. 날짜 수정인지 확인(밑 경우는 전부 true)
    // 1. true
    // 1.1. 과거 -> 과거 인 경우 그대로
    // 1.2. 과거 -> 미래 / 미래 -> 과거인 경우 리스트 이동
    // 1.3. 과거 -> 미래 / 현재 -> 미래인 경우 사라짐
  } catch (err) {
    handleError(err);
  }
}
