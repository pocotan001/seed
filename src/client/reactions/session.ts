import { reaction, toJS } from "mobx";
import createLogger from "~/infrastructure/logger";
import { State } from "~/store/state";

const STORAGE_KEY = "session";
const log = createLogger("[session]");

const save = (state: State["session"]) => {
  const serialized = toJS(state);

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  log.debug("Saved: %o", serialized);
};

const session = (state: State) => {
  reaction(() => state.session, save, { name: "session.save" });
};

export default session;
