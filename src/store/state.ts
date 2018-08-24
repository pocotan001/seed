import { createLocation, Location } from "history";
import { extendObservable, observable } from "mobx";
import config from "~/config";
import { INormalizedEntities } from "~/domain/Normalized";
import { IUser } from "~/domain/User";

// Base64 encoded keys
export enum SessionKey {
  EXAMPLE_FORM = "RVhBTVBMRV9GT1JN"
}

export const defaultState: State = Object.freeze({
  auth: {},
  history: {
    origin: "",
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
  auth!: {
    me?: IUser;
  };

  history!: {
    origin: string;
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
