import { Reducer } from "redux";
import { LoadingAction } from "./LoadingActions";
import { LoadingActionType } from "./LoadingActionType";
import { LoadingState } from "./LoadingState";

type LoadingReducer = Reducer<Readonly<LoadingState>, LoadingAction>;

const initialState: LoadingState = {
  isLoading: false
};

const loadingReducer: LoadingReducer = (
  state = initialState,
  action
): LoadingState => {
  switch (action.type) {
    case LoadingActionType.Start:
      return {
        ...state,
        isLoading: true
      };
    case LoadingActionType.Finish:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default loadingReducer;
