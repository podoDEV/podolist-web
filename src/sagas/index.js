import {delay} from 'redux-saga';
import {spawn} from 'redux-saga/effects';

import todo from './todo';

export default function* root() {
  try {
    yield spawn(todo);
  } catch (err) {
    yield delay(10);
    yield console.error('error: ', err);
  }
}
