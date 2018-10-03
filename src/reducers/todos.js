import dotProp from 'dot-prop-immutable';
import _ from 'lodash';
import {SET_TODOS, APPLY_UPDATED_TODO, APPLY_REMOVED_TODO, APPLY_TOGGLE_ISCOMPLETED_TODO} from '../actions/todo';

export default (state = {}, action) => {
  switch (action.type) {
    case APPLY_REMOVED_TODO: {
      const {itemId, isCompleted} = action;
      if (isCompleted) {
        const itemIdx = _.findIndex(state.finishedTodoList, (item) => {
          return item.id === itemId;
        });
        return dotProp.delete(state, `finishedTodoList.${itemIdx}`);
      }
      const itemIdx = _.findIndex(state.unfinishedTodoList, (item) => {
        return item.id === itemId;
      });
      return dotProp.delete(state, `unfinishedTodoList.${itemIdx}`);
    }
    case APPLY_TOGGLE_ISCOMPLETED_TODO: {
      const {itemId, isCompleted} = action;
      if (isCompleted) {
        const itemIdx = _.findIndex(state.finishedTodoList, (item) => {
          return item.id === itemId;
        });

        let newState = dotProp.toggle(state, `finishedTodoList.${itemIdx}.isCompleted`);
        const item = dotProp.get(newState, `finishedTodoList.${itemIdx}`);
        newState = dotProp.delete(newState, `finishedTodoList.${itemIdx}`);
        newState = dotProp.set(newState, `unfinishedTodoList`, [...newState.unfinishedTodoList, item]);

        return newState;
      }
      const itemIdx = _.findIndex(state.unfinishedTodoList, (item) => {
        return item.id === itemId;
      });

      let newState = dotProp.toggle(state, `unfinishedTodoList.${itemIdx}.isCompleted`);
      const item = dotProp.get(newState, `unfinishedTodoList.${itemIdx}`);

      newState = dotProp.delete(newState, `unfinishedTodoList.${itemIdx}`);
      newState = dotProp.set(newState, `finishedTodoList`, [...newState.finishedTodoList, item]);

      return newState;
    }
    case APPLY_UPDATED_TODO:
      // const {itemId, updatedTodo} = action;
      // if (action.todo.isCompleted) {
      //   dotProp.delete(state, )
      // } else {
      //
      // }
      // const dotProp(state, 'finishedTodoList')
      return state;
    case SET_TODOS:
      return action.todos;
    default:
      return state;
  }
};
