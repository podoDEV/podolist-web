import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import {
  SET_TODOS,
  APPLY_REMOVED_TODO,
  APPLY_TOGGLE_ISCOMPLETED_TODO,
  APPLY_UPDATED_TODO,
  CLEAR_TODOS
} from '../actions/todo';

export default (
  state = {
    delayedItems: [],
    items: []
  },
  action
) => {
  switch (action.type) {
    case CLEAR_TODOS:
      return {};
    case APPLY_REMOVED_TODO: {
      const {itemId, isDelayed} = action;

      if (isDelayed) {
        const itemIdx = _.findIndex(state.delayedItems, (item) => {
          return item.id === itemId;
        });
        return {
          ...state,
          delayedItems: dotProp.delete(state.delayedItems, `${itemIdx}`)
        };
      }

      const itemIdx = _.findIndex(state.items, (item) => {
        return item.id === itemId;
      });

      return {
        ...state,
        items: dotProp.delete(state.items, `${itemIdx}`)
      };
    }
    case APPLY_TOGGLE_ISCOMPLETED_TODO: {
      const {itemId, isDelayed} = action;

      if (isDelayed) {
        const itemIdx = _.findIndex(state.delayedItems, (item) => {
          return item.id === itemId;
        });

        return {
          ...state,
          delayedItems: dotProp.toggle(state.delayedItems, `${itemIdx}.isCompleted`)
        };
      }

      const itemIdx = _.findIndex(state.items, (item) => {
        return item.id === itemId;
      });

      return {
        ...state,
        items: dotProp.toggle(state.items, `${itemIdx}.isCompleted`)
      };
    }
    case APPLY_UPDATED_TODO: {
      const {itemId, updatedTodo, isDelayed} = action;

      if (isDelayed) {
        return {
          ...state,
          delayedItems: state.delayedItems.map((item) => (item.id === itemId ? updatedTodo : item))
        };
      }

      return {
        ...state,
        items: state.items.map((item) => (item.id === itemId ? updatedTodo : item))
      };
    }
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
};
