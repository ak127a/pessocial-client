import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SHOW_SIGNUP_SUCCESS,
  CLOSE_SIGNUP_SUCCESS,
  CLOSE_LOGOUT_SUCCESS,
  SHOW_LOGIN_SUCCESS,
  CLOSE_LOGIN_SUCCESS,
  SHOW_LOGOUT_SUCCESS,
  STOP_LOADING_UI
} from "../types";

const initialState = {
  loading: false,
  showSignUpSuccess: false,
  showLogInSuccess: false,
  showLogOutSuccess: false,
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
        showLogInSuccess: false,
        showLogOutSuccess: false,
        showSignUpSuccess: true
      };
    case SHOW_LOGIN_SUCCESS:
      return {
        ...state,
        showLogInSuccess: true,
        showLogOutSuccess: false,
        showSignUpSuccess: false
      };
    case SHOW_LOGOUT_SUCCESS:
      return {
        ...state,
        showLogInSuccess: false,
        showLogOutSuccess: true,
        showSignUpSuccess: false
      };
    case CLOSE_SIGNUP_SUCCESS:
      return {
        ...state,
        showSignUpSuccess: false
      };
    case CLOSE_LOGOUT_SUCCESS:
      return {
        ...state,
        showLogOutSuccess: false
      };
    case CLOSE_LOGIN_SUCCESS:
      return {
        ...state,
        showLogInSuccess: false
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
