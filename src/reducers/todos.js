import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import {SET_TODOS, APPLY_REMOVED_TODO, APPLY_TOGGLE_ISCOMPLETED_TODO, APPLY_UPDATED_TODO} from '../actions/todo';

export default (state = [], action) => {
  switch (action.type) {
    case APPLY_REMOVED_TODO: {
      const {itemId} = action;
      const itemIdx = _.findIndex(state, (item) => {
        return item.id === itemId;
      });
      return dotProp.delete(state, `${itemIdx}`);
    }
    case APPLY_TOGGLE_ISCOMPLETED_TODO: {
      const {itemId} = action;
      const itemIdx = _.findIndex(state, (item) => {
        return item.id === itemId;
      });

      return dotProp.toggle(state, `${itemIdx}.isCompleted`);
    }
    case APPLY_UPDATED_TODO: {
      const {itemId, updatedTodo} = action;

      return state.map((item) => (item.id === itemId ? updatedTodo : item));
    }
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
};
