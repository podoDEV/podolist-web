import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

export type ICountState = {
  data: number;
};

const initialState: ICountState = {
  data: 0
};

export const INCREASE = "INCREASE" as const;
export const DECREASE = "DECREASE" as const;

// Async test 용
export const GET_RANDOM_NUMBER = "GET_RANDOM_NUMBER" as const;
export const GET_RANDOM_NUMBER_SUCCESS = "GET_RANDOM_NUMBER_SUCCESS" as const;

export const increase = () => ({
  type: INCREASE
});
export const decrease = () => ({
  type: DECREASE
});

export const countReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE: {
      return {
        ...state,
        ...action.payload.count
      };
    }
    case INCREASE:
      return {
        ...state,
        data: state.data + 1
      };
    case DECREASE:
      return {
        ...state,
        data: state.data - 1
      };
  }
  return state;
};
