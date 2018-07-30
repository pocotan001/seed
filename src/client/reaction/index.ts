import { State } from "~/store/state";
import head from "./head";
import session from "./session";

export const start = (state: State) => {
  head(state);
  session(state);
};
