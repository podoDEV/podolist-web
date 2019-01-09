// saga
export const FETCH_TODO = 'FETCH_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_ISCOMPLETED_TODO = 'TOGGLE_ISCOMPLETED_TODO';

// store
export const CLEAR_TODOS = 'CLEAR_TODOS';
export const SET_TODOS = 'SET_TODOS';
export const APPLY_REMOVED_TODO = 'APPLY_REMOVED_TODO';
export const APPLY_UPDATED_TODO = 'APPLY_UPDATED_TODO';
export const APPLY_TOGGLE_ISCOMPLETED_TODO = 'APPLY_TOGGLE_ISCOMPLETED_TODO';
export const MOVE_TODO_LIST = 'MOVE_TODO_LIST';

export const moveTodoList = (itemId, isCompleted) => ({
  type: MOVE_TODO_LIST,
  itemId,
  isCompleted
});

export const clearTodos = () => ({
  type: CLEAR_TODOS
});

export const applyUpdatedTodo = (itemId, updatedTodo, isDelayed) => ({
  type: APPLY_UPDATED_TODO,
  itemId,
  updatedTodo,
  isDelayed
});

export const createTodo = (todo) => ({
  type: CREATE_TODO,
  todo
});

export const removeTodo = (itemId, isCompleted, isDelayed) => ({
  type: REMOVE_TODO,
  itemId,
  isCompleted,
  isDelayed
});

export const updateTodo = (itemId, todo, isDelayed) => {
  return {
    type: UPDATE_TODO,
    itemId,
    todo,
    isDelayed
  };
};

export const fetchTodo = () => ({
  type: FETCH_TODO
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});

export const applyRemovedTodo = (itemId, isDelayed) => ({
  type: APPLY_REMOVED_TODO,
  itemId,
  isDelayed
});

export const toggleIsCompletedTodo = (itemId, isCompleted, isDelayed) => ({
  type: TOGGLE_ISCOMPLETED_TODO,
  itemId,
  isCompleted,
  isDelayed
});

export const applyToggleIsCompletedTodo = (itemId, isDelayed) => ({
  type: APPLY_TOGGLE_ISCOMPLETED_TODO,
  itemId,
  isDelayed
});
