import {call, takeLatest, put} from 'redux-saga/effects';
import history from '../browserHistory';
import {USER_LOGIN, applyUserInfo} from '../actions/login';
import {login} from '../service/login';

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
}

function* userLoginSaga(action) {
  try {
    const {data} = yield call(login, {accessToken: action.accessToken});
    console.log(yield call(login, {accessToken: action.accessToken}));
    // if (name) {
    //   yield put(applyUserInfo(name));
    //   yield history.replace('/');
    // } else {
    //   alert('로그인 실패!');
    // }
  } catch (err) {
    console.error(err);
  }
}
