// saga
export const FETCH_TODO = 'FETCH_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_ISCOMPLETED_TODO = 'TOGGLE_ISCOMPLETED_TODO';

// store
export const SET_TODOS = 'SET_TODOS';
export const APPLY_REMOVED_TODO = 'APPLY_REMOVED_TODO';
export const APPLY_UPDATED_TODO = 'APPLY_UPDATED_TODO';
export const APPLY_TOGGLE_ISCOMPLETED_TODO = 'APPLY_TOGGLE_ISCOMPLETED_TODO';

export const applyUpdatedTodo = (itemId, updatedTodo) => ({
  type: APPLY_UPDATED_TODO,
  itemId,
  updatedTodo
});

export const createTodo = (todo) => ({
  type: CREATE_TODO,
  todo
});

export const removeTodo = (itemId, isCompleted) => ({
  type: REMOVE_TODO,
  itemId,
  isCompleted
});

export const updateTodo = (itemId, todo) => {
  return {
    type: UPDATE_TODO,
    itemId,
    todo
  };
};

export const fetchTodo = () => ({
  type: FETCH_TODO
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});

export const applyRemovedTodo = (itemId) => ({
  type: APPLY_REMOVED_TODO,
  itemId
});

export const toggleIsCompletedTodo = (itemId, isCompleted) => ({
  type: TOGGLE_ISCOMPLETED_TODO,
  itemId,
  isCompleted
});

export const applyToggleIsCompletedTodo = (itemId) => ({
  type: APPLY_TOGGLE_ISCOMPLETED_TODO,
  itemId
});
