import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SHOW_SIGNUP_SUCCESS,
  CLOSE_SIGNUP_SUCCESS
} from "../types";

const initialState = {
  loading: false,
  showSignUpSuccess: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case SHOW_SIGNUP_SUCCESS:
      return {
        ...state,
        showSignUpSuccess: true
      };
    case CLOSE_SIGNUP_SUCCESS:
      return {
        ...state,
        showSignUpSuccess: false
      };
    default:
      return state;
  }
}
