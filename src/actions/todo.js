export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FETCH_TODO = 'FETCH_TODO';
export const SET_TODOS = 'SET_TODOS';
export const POST_TODO = 'POST_TODO';
export const TOGGLE_TODO_COMPLETE = 'TOGGLE_TODO_COMPLETE';
export const CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE';

export const changeTodoTitle = (itemId, title) => ({
  type: CHANGE_TODO_TITLE,
  itemId,
  title
});

export const toggleTodoComplete = (itemId, isCompleted) => ({
  type: TOGGLE_TODO_COMPLETE,
  itemId,
  isCompleted
});

export const postTodo = (todo) => ({
  type: POST_TODO,
  todo
});

export const removeTodo = (itemId) => ({
  type: REMOVE_TODO,
  itemId
});

export const updateTodo = () => {
  return {
    type: UPDATE_TODO
  };
};

export const fetchTodo = () => ({
  type: FETCH_TODO
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  todos
});
