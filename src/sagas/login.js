import {call, takeLatest, put} from 'redux-saga/effects';
import Cookies from 'universal-cookie';

import history from '../browserHistory';
import {USER_LOGIN, applyUserInfo, FETCH_USER_INFO_SAGA} from '../actions/login';
import {login, fetchUserInfo} from '../service/login';

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
  yield takeLatest(FETCH_USER_INFO_SAGA, fetchUserInfoSaga);
}

function* userLoginSaga(action) {
  try {
    const cookies = new Cookies();
    const {
      data: {sessionId, user}
    } = yield call(login, {accessToken: action.accessToken});

    // cookies.set('SESSIONID', sessionId, {path: '/'});

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

function* fetchUserInfoSaga() {
  try {
    const cookies = new Cookies();
    const SESSIONID = cookies.get('SESSIONID');

    if (SESSIONID) {
      const {data} = yield call(fetchUserInfo);

      yield put(applyUserInfo(data));
    }
  } catch (err) {
    console.error(err);
  }
}
