import {combineReducers as combine} from 'redux';
import {routerReducer} from 'react-router-redux';

import todos from './todos';
import users from './users';
import forms from './forms';
import today from './today';

export default combine({
  users,
  todos,
  forms,
  today,
  router: routerReducer
});
