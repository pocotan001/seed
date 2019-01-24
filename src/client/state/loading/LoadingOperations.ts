import { Dispatch } from "redux";
import { finish, start } from "./LoadingActions";

export interface LoadingOperations {
  start(): void;
  finish(): void;
}

const createLoadingOperations = (dispatch: Dispatch): LoadingOperations => ({
  start() {
    dispatch(start());
  },

  finish() {
    dispatch(finish());
  }
});

export default createLoadingOperations;
