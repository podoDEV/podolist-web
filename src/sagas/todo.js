import {call, takeLatest} from 'redux-saga/effects';
import {AXIOS_TEST} from '../actions/todo';
import {test} from '../service/todo';

export default function*() {
  yield takeLatest(AXIOS_TEST, axiosTestSaga);
}

function* axiosTestSaga() {
  try {
    yield console.log('hello!');
    const {data} = yield call(test);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
