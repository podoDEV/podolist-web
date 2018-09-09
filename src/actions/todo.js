export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const AXIOS_TEST = 'AXIOS_TEST';

export const addTodo = (content) => {
  return {
    type: ADD_TODO,
    content
  };
};

export const removeTodo = () => {
  return {
    type: REMOVE_TODO
  };
};

export const updateTodo = () => {
  return {
    type: UPDATE_TODO
  };
};

export const axiosTest = () => {
  return {
    type: AXIOS_TEST
  };
};
