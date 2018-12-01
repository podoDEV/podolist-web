import {delay} from 'redux-saga';
import {spawn} from 'redux-saga/effects';

import todo from './todo';
import login from './login';
import today from './today';

export default function* root() {
  try {
    yield spawn(todo);
    yield spawn(login);
    yield spawn(today);
  } catch (err) {
    yield delay(10);
    yield console.error('error: ', err);
  }
}
