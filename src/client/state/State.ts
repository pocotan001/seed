import { RouterState } from "connected-react-router";
import { FormStateMap } from "redux-form";
import { PersistPartial } from "redux-persist";
import { AuthState } from "./auth/AuthState";
import { LoadingState } from "./loading/LoadingState";

export interface State {
  router: RouterState;
  form: FormStateMap & PersistPartial;
  auth: AuthState & PersistPartial;
  loading: LoadingState;
}
