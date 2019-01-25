import { Dispatch } from "redux";
import { reset } from "./RootActions";

export interface RootOperations {
  reset(): void;
}

const createRootOperations = (dispatch: Dispatch): RootOperations => ({
  reset() {
    dispatch(reset());
  }
});

export default createRootOperations;
