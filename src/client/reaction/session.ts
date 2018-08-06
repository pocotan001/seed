import { reaction, toJS } from "mobx";
import * as StorageKey from "~/constants/StorageKey";
import createLogger from "~/infra/logger";
import { State } from "~/store/state";

const log = createLogger("[session]");

const save = (state: State["session"]) => {
  const serialized = toJS(state);

  window.sessionStorage.setItem(StorageKey.SESSION, JSON.stringify(serialized));
  log.debug("Saved: %o", serialized);
};

const session = (state: State) => {
  reaction(() => state.session, save, { name: "session.save" });
};

export default session;
