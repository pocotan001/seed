import { User } from "../../../entities/User";
import { APIClient } from "../client/APIClient";

export interface LoginResponse {
  token: string;
  me: User;
}

// tslint:disable-next-line:no-empty-interface
export interface LogoutResponse {}

export interface AuthRepository {
  login(email: string, password: string): Promise<LoginResponse>;
  logout(): Promise<LogoutResponse>;
}

const createAuthRepository = (api: APIClient): AuthRepository => ({
  async login(email, password) {
    return ((await api
      .post("login", {
        json: {
          email,
          password
        }
      })
      .json()) as unknown) as LoginResponse;
  },

  async logout() {
    return ((await api.post("logout")) as unknown) as LogoutResponse;
  }
});

export default createAuthRepository;
