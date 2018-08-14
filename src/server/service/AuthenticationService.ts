import { IUser } from "~/domain/User";
import Service from "./Service";

interface ISignInParams {
  email: string;
  password: string;
}

const FAKE_USER = {
  id: "0",
  email: "fake@example.com",
  password: "xxxxx"
};

const isEmailValid = (email: string): boolean => {
  return email === FAKE_USER.email;
};

const isPasswordValid = (password: string): boolean => {
  // tslint:disable-next-line:possible-timing-attack
  return password === FAKE_USER.password;
};

export default class UserService extends Service {
  async getToken({ email, password }: ISignInParams): Promise<string> {
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      const err = new Error("Bad credentials");
      err.status = 401;

      throw err;
    }

    return "AccessTokenGotFromApiService";
  }

  async getMe(): Promise<IUser> {
    const { id, email } = FAKE_USER;

    return { id, email };
  }
}