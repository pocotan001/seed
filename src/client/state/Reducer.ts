import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers, Reducer as ReduxReducer } from "redux";
import { reducer as formReducer } from "redux-form";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import authReducer from "./auth/AuthReducer";
import loadingReducer from "./loading/LoadingReducer";
import { State } from "./State";

export type Reducer = ReduxReducer<State>;

const createReducer = (history: History): Reducer =>
  combineReducers({
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

export default createReducer;
