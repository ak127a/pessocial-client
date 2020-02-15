import { SHOW_SIGNUP_SUCCESS, CLOSE_SIGNUP_SUCCESS } from "../types";

export const closeSignUpSuccess = () => dispatch => {
  dispatch({ type: CLOSE_SIGNUP_SUCCESS });
};
