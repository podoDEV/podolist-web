import {combineReducers as combine} from 'redux';
import {routerReducer} from 'react-router-redux';

import todos from './todos';

export default combine({
  todos,
  router: routerReducer
});
