import { Reducer } from "redux";
import { AuthAction } from "./AuthActions";
import { AuthActionType } from "./AuthActionType";
import { AuthState } from "./AuthState";

type AuthReducer = Reducer<Readonly<AuthState>, AuthAction>;

const initialState: AuthState = {
  token: null,
  me: null,
  isLoading: false,
  error: null
};

const authReducer: AuthReducer = (state = initialState, action): AuthState => {
  switch (action.type) {
    case AuthActionType.LoginRequest:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AuthActionType.LoginSuccess:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case AuthActionType.LoginFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case AuthActionType.LogoutRequest:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AuthActionType.LogoutSuccess:
      return {
        ...state,
        token: null,
        me: null,
        isLoading: false
      };
    case AuthActionType.LogoutFailure:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
