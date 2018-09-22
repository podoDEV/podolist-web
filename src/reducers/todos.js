// import dotProp from 'dot-prop-immutable';
import {SET_TODOS, UPDATE_TODO} from '../actions/todo';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TODO:
      return state;
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
};
