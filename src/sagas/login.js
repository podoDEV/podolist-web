import {call, takeLatest, put} from 'redux-saga/effects';
import Cookies from 'universal-cookie';

import history from '../browserHistory';
import {USER_LOGIN, applyUserInfo} from '../actions/login';
import {login} from '../service/login';

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
}

function* userLoginSaga(action) {
  try {
    const cookies = new Cookies();
    const {
      data: {sessionId, user}
    } = yield call(login, {accessToken: action.accessToken});

    cookies.set('SESSIONID', sessionId, {path: '/'});

    if (user) {
      yield put(applyUserInfo(user));
      yield history.replace('/');
    } else {
      alert('로그인 실패!');
    }
  } catch (err) {
    console.error(err);
  }
}
