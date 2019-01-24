import { Action } from "../Action";
import { LoadingActionType } from "./LoadingActionType";

type StartLoadingAction = Action<LoadingActionType.Start>;
type FinishLoadingAction = Action<LoadingActionType.Finish>;

export type LoadingAction = StartLoadingAction | FinishLoadingAction;

export const start = (): StartLoadingAction => ({
  type: LoadingActionType.Start,
  payload: null
});

export const finish = (): FinishLoadingAction => ({
  type: LoadingActionType.Finish,
  payload: null
});
