import { Action } from "../Action";
import { LoadingActionType } from "./LoadingActionType";

type StartAction = Action<LoadingActionType.Start>;
type FinishAction = Action<LoadingActionType.Finish>;

export type LoadingAction = StartAction | FinishAction;

export const start = (): StartAction => ({
  type: LoadingActionType.Start,
  payload: null
});

export const finish = (): FinishAction => ({
  type: LoadingActionType.Finish,
  payload: null
});
