import { AuthState } from "./AuthState";

export interface AuthGetters {
  isLoggedIn: boolean;
}

const createAuthGetters = (state: AuthState): AuthGetters => ({
  get isLoggedIn() {
    return !!state.token;
  }
});

export default createAuthGetters;
