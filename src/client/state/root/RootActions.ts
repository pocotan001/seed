import { RouterAction } from "connected-react-router";
import { FormAction } from "redux-form";
import { PersistorAction } from "redux-persist";
import { Action } from "../Action";
import { AuthAction } from "../auth/AuthActions";
import { LoadingAction } from "../loading/LoadingActions";
import { RootActionType } from "./RootActionType";

type ResetAction = Action<RootActionType.Reset>;

export type RootAction =
  | ResetAction
  | PersistorAction
  | RouterAction
  | FormAction
  | AuthAction
  | LoadingAction;

export const reset = (): ResetAction => ({
  type: RootActionType.Reset,
  payload: null
});
