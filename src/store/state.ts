import { createLocation, Location } from "history";
import { extendObservable, observable } from "mobx";
import config from "~/config";
import { INormalizedEntities } from "~/domain/Normalized";

export enum SessionKey {
  EXAMPLE_FORM = "EXAMPLE_FORM"
}

export const defaultState: State = Object.freeze({
  app: {
    locationOrigin: "",
    hasError: false
  },
  history: {
    location: createLocation(""),
    visited: {}
  },
  head: {
    title: config.siteName,
    meta: [],
    link: []
  },
  loading: {
    percent: 0,
    hidden: true
  },
  session: {},
  entities: {
    user: null,
    cats: {}
  },
  results: {
    cats: {}
  },
  cats: {
    totalCount: 0
  }
});

export class State {
  app!: {
    locationOrigin: string;
    hasError: boolean;
  };

  history!: {
    location: Location;
    visited: { [key: string]: boolean };
  };

  head!: {
    title: string;
    meta: Array<React.MetaHTMLAttributes<HTMLMetaElement>>;
    link: Array<React.LinkHTMLAttributes<HTMLLinkElement>>;
  };

  loading!: {
    percent: number;
    hidden: boolean;
  };

  session!: { [K in SessionKey]?: any };

  entities!: INormalizedEntities;

  results!: Record<
    "cats",
    {
      [serializedParams: string]: string[];
    }
  >;

  cats!: {
    totalCount: number;
  };

  constructor(initialState?: Partial<State>) {
    extendObservable(
      this,
      { ...defaultState, ...initialState },
      {},
      {
        defaultDecorator: observable.shallow
      }
    );
  }
}

const createState = (initialState?: Partial<State>) => new State(initialState);

export default createState;
