export const CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE';
export const CHANGE_TODO_PRIORITY = 'CHANGE_TODO_PRIORITY';
export const CHANGE_SELECTED_DATE = 'CHANGE_SELECTED_DATE';
export const CHANGE_DATE_BASE = 'CHANGE_DATE_BASE';
export const CLEAR_FORMS = 'CLEAR_FORMS';
export const SET_EXIST_ITEM_TO_FORMS = 'SET_EXIST_ITEM_TO_FORMS';
export const SET_OPENED_CONTEXT_MENU_ID = 'SET_OPENED_CONTEXT_MENU_ID';
export const SET_IS_OPEN_ADDITIONAL_FORMS = 'SET_IS_OPEN_ADDITIONAL_FORMS';

export const changeTodoTitle = (todoTitle) => ({
  type: CHANGE_TODO_TITLE,
  todoTitle
});

export const changeTodoPriority = (todoPriority) => ({
  type: CHANGE_TODO_PRIORITY,
  todoPriority
});

export const changeSelectedDate = (selectedDate) => ({
  type: CHANGE_SELECTED_DATE,
  selectedDate
});

export const changeDateBase = (months) => ({
  type: CHANGE_DATE_BASE,
  months
});

export const clearForms = () => ({
  type: CLEAR_FORMS
});

export const setExistItemToForms = (todo) => ({
  type: SET_EXIST_ITEM_TO_FORMS,
  todo
});

export const setIsOpenAdditionalForms = (isOpen) => ({
  type: SET_IS_OPEN_ADDITIONAL_FORMS,
  isOpen
});

export const setOpenedContextMenuId = (itemId) => ({
  type: SET_OPENED_CONTEXT_MENU_ID,
  itemId
});
