import {combineReducers as combine} from 'redux';
import {routerReducer} from 'react-router-redux';

import todos from './todos';
import users from './users';

export default combine({
  users,
  todos,
  router: routerReducer
});
