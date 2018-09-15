export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const FETCH_TODO = 'FETCH_TODO';
export const SET_TODOS = 'SET_TODOS';
export const POST_TODO = 'POST_TODO';

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
