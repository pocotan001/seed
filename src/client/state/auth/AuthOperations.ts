import { Dispatch } from "redux";
import { Persistor } from "redux-persist";
import {
  AuthRepository,
  LoginResponse,
  LogoutResponse
} from "../../infra/repositories/AuthRepository";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess
} from "./AuthActions";

export interface AuthOperations {
  login(email: string, password: string): Promise<LoginResponse>;
  logout(): Promise<LogoutResponse>;
}

const createAuthOperations = (
  dispatch: Dispatch,
  persistor: Persistor,
  authRepo: AuthRepository
): AuthOperations => ({
  async login(email, password) {
    dispatch(loginRequest());

    try {
      const resp = await authRepo.login(email, password);

      dispatch(loginSuccess(resp));
      return resp;
    } catch (err) {
      dispatch(loginFailure(err));
      throw err;
    }
  },

  async logout() {
    dispatch(logoutRequest());

    try {
      const resp = await authRepo.logout();

      await persistor.purge();
      dispatch(logoutSuccess());

      return resp;
    } catch (err) {
      dispatch(logoutFailure(err));
      throw err;
    }
  }
});

export default createAuthOperations;
