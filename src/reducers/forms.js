import moment from 'moment';
import {
  CHANGE_TODO_TITLE,
  CHANGE_TODO_PRIORITY,
  CHANGE_SELECTED_DATE,
  CHANGE_DATE_BASE,
  CLEAR_FORMS,
  SET_EXIST_ITEM_TO_FORMS,
  SET_OPENED_CONTEXT_MENU_ID,
  SET_IS_OPEN_ADDITIONAL_FORMS
} from '../actions/forms';

export const getBase = (endedAt) => {
  let base = -1000;
  for (let i = 0; i < 1000; i += 1) {
    if (
      moment()
        .add(base, 'M')
        .format('YYYY-MM') === moment(endedAt * 1000).format('YYYY-MM')
    ) {
      break;
    }
    base += 1;
  }

  return base;
};

export default (
  state = {
    todoTitle: '',
    selectedPriority: 'none',
    selectedDate: Number(moment().format('D')),
    base: 0,
    editId: -1,
    openedContextMenuId: -1,
    isOpenAdditionalForms: false
  },
  action
) => {
  switch (action.type) {
    case CHANGE_TODO_TITLE:
      return {
        ...state,
        todoTitle: action.todoTitle
      };
    case CHANGE_TODO_PRIORITY:
      return {
        ...state,
        selectedPriority: action.todoPriority
      };
    case CHANGE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate
      };
    case CHANGE_DATE_BASE: {
      const {base} = state;
      const {months} = action;

      if (base + months === 0) {
        return {
          ...state,
          base: 0,
          selectedDate: Number(moment().format('D'))
        };
      }

      return {
        ...state,
        base: base + months,
        selectedDate: 1
      };
    }
    case CLEAR_FORMS:
      return {
        ...state,
        todoTitle: '',
        selectedPriority: 'none',
        selectedDate: Number(moment().format('D')),
        base: 0,
        editId: -1
      };
    case SET_EXIST_ITEM_TO_FORMS: {
      const {title, priority, endedAt, id} = action.todo;

      return {
        ...state,
        editId: id,
        todoTitle: title,
        selectedPriority: priority,
        base: Number(getBase(endedAt)),
        selectedDate: Number(moment(endedAt * 1000).format('DD'))
      };
    }
    case SET_OPENED_CONTEXT_MENU_ID:
      return {
        ...state,
        openedContextMenuId: action.itemId
      };
    case SET_IS_OPEN_ADDITIONAL_FORMS:
      return {
        ...state,
        isOpenAdditionalForms: action.isOpen
      };
    default:
      return state;
  }
};
