// import dotProp from 'dot-prop-immutable';
import {ADD_TODO, REMOVE_TODO, UPDATE_TODO} from '../actions/todo';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        {
          content: action.content,
          complete: false
        },
        ...state
      ];
    case REMOVE_TODO:
      return state;
    case UPDATE_TODO:
      return state;
    default:
      return state;
  }
};
