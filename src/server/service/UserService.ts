import { IUser } from "~/domain/entities";
import Service from "./Service";

interface ILoginParams {
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
  return password === FAKE_USER.password;
};

export default class UserService extends Service {
  async getToken({ email, password }: ILoginParams): Promise<string> {
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      const err = new Error("bad credentials");
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
