import {call, takeLatest, put} from 'redux-saga/effects';
import Cookies from 'js-cookie';

import history from '../browserHistory';
import {USER_LOGIN, applyUserInfo, FETCH_USER_INFO_SAGA} from '../actions/login';
import {login, fetchUserInfo} from '../service/login';
import {handleError} from './todo';

export const COOKIE_DOMAIN = '.podolist.com';

export default function*() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
  yield takeLatest(FETCH_USER_INFO_SAGA, fetchUserInfoSaga);
}

function* userLoginSaga(action) {
  try {
    const {
      data: {sessionId, user}
    } = yield call(login, {accessToken: action.accessToken});

    Cookies.set('SESSIONID', sessionId, {
      domain: COOKIE_DOMAIN,
      path: '/'
    });

    if (user) {
      yield put(applyUserInfo(user));
      yield history.replace('/');
    } else {
      alert('로그인 실패!');
    }
  } catch (err) {
    handleError(err);
  }
}

function* fetchUserInfoSaga() {
  try {
    const {data} = yield call(fetchUserInfo);
    yield put(applyUserInfo(data));
  } catch (err) {
    handleError(err);
  }
}
