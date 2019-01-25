import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers, Reducer } from "redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "../auth/AuthReducer";
import loadingReducer from "../loading/LoadingReducer";
import { RootAction } from "./RootActions";
import { RootActionType } from "./RootActionType";
import { RootState } from "./RootState";

type RootReducer = Reducer<Readonly<RootState>, RootAction>;

const createRootReducer = (history: History): RootReducer => {
  const reducer = combineReducers<RootState>({
    router: connectRouter(history),
    form: persistReducer(
      {
        key: "form",
        storage: storageSession,
        whitelist: []
      },
      formReducer
    ),
    auth: persistReducer(
      {
        storage,
        key: "auth"
      },
      authReducer
    ),
    loading: loadingReducer
  });

  return (state, action) => {
    // Reset the all state except the `router`
    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store#answer-35641992
    if (state && action.type === RootActionType.Reset) {
      state = {
        router: state.router
      } as RootState;
    }

    return reducer(state, action);
  };
};

export default createRootReducer;
