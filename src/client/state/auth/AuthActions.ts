import { LoginResponse } from "../../infra/repositories/AuthRepository";
import { Action, ErrorAction } from "../Action";
import { AuthActionType } from "./AuthActionType";

type LoginRequestAction = Action<AuthActionType.LoginRequest>;
type LoginSuccessAction = Action<AuthActionType.LoginSuccess, LoginResponse>;
type LoginFailureAction = ErrorAction<AuthActionType.LoginFailure>;

type LogoutRequestAction = Action<AuthActionType.LogoutRequest>;
type LogoutSuccessAction = Action<AuthActionType.LogoutSuccess>;
type LogoutFailureAction = ErrorAction<AuthActionType.LogoutFailure>;

export type AuthAction =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction;

export const loginRequest = (): LoginRequestAction => ({
  type: AuthActionType.LoginRequest,
  payload: null
});

export const loginSuccess = (resp: LoginResponse): LoginSuccessAction => ({
  type: AuthActionType.LoginSuccess,
  payload: resp
});

export const loginFailure = (err: Error): LoginFailureAction => ({
  type: AuthActionType.LoginFailure,
  payload: err,
  error: true
});

export const logoutRequest = (): LogoutRequestAction => ({
  type: AuthActionType.LogoutRequest,
  payload: null
});

export const logoutSuccess = (): LogoutSuccessAction => ({
  type: AuthActionType.LogoutSuccess,
  payload: null
});

export const logoutFailure = (err: Error): LogoutFailureAction => ({
  type: AuthActionType.LogoutFailure,
  payload: err,
  error: true
});
