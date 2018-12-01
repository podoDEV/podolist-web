import {APPLY_USER_INFO} from '../actions/login';

export default (state = {}, action) => {
  switch (action.type) {
    case APPLY_USER_INFO:
      return action.userInfo;
    default:
      return state;
  }
};
