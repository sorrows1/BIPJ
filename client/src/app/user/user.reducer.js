import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.UPDATE_BALANCE:
      return {
        ...state,
        currentUser: {...state.currentUser, balance: payload}
      }
    default:
      return state; // tells redux that state does not update
  }
};
