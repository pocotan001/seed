import { User } from "../../../entities/User";

export interface AuthState {
  token: string | null;
  me: User | null;
  isLoading: boolean;
  error: Error | null;
}
