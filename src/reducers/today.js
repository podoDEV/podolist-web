import moment from 'moment';
import {CHANGE_TODAY_BASE, CHANGE_TODAY_DATE} from '../actions/today';

export default (
  state = {
    selectedDate: Number(moment().format('D')),
    base: 0
  },
  action
) => {
  switch (action.type) {
    case CHANGE_TODAY_BASE: {
      const {base} = state;
      const {months} = action;

      if (base + months === 0) {
        return {
          base: 0,
          selectedDate: Number(moment().format('D'))
        };
      }
      // base, selectedDate 한 번에 업데이트가 필요하다

      return {
        ...state,
        base: base + months
      };
    }
    case CHANGE_TODAY_DATE:
      return {
        ...state,
        selectedDate: action.selectedDate
      };
    default:
      return state;
  }
};
