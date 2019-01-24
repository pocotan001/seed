import { Dispatch } from "redux";
import { Persistor } from "redux-persist";
import { Repositories } from "../infra/repositories";
import createAuthOperations, { AuthOperations } from "./auth/AuthOperations";
import createLoadingOperations, {
  LoadingOperations
} from "./loading/LoadingOperations";

export interface Operations {
  auth: AuthOperations;
  loading: LoadingOperations;
}

const createOperations = (
  dispatch: Dispatch,
  persistor: Persistor,
  repos: Repositories
): Operations => ({
  auth: createAuthOperations(dispatch, persistor, repos.auth),
  loading: createLoadingOperations(dispatch)
});

export default createOperations;
