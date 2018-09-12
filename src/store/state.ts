import { createLocation, Location } from "history";
import { extendObservable, observable } from "mobx";
import config from "~/config";
import { NormalizedEntities } from "~/domain/Normalized";
import { User } from "~/domain/User";

export interface State {
  auth: {
    me?: User;
  };
  history: {
    location: Location;
    visited: { [key: string]: boolean };
  };
  head: {
    title: string;
    meta: Array<React.MetaHTMLAttributes<HTMLMetaElement>>;
    link: Array<React.LinkHTMLAttributes<HTMLLinkElement>>;
  };
  loading: {
    percent: number;
    hidden: boolean;
  };
  session: { [K in SessionKey]?: any };
  entities: NormalizedEntities;
  results: Record<
    "cats",
    {
      [serializedParams: string]: string[];
    }
  >;
  cats: {
    totalCount: number;
  };
}

// Base64 encoded keys
export enum SessionKey {
  ExampleForm = "RVhBTVBMRV9GT1JN"
}

export const defaultState: Readonly<State> = {
  auth: {},
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
    cats: {}
  },
  results: {
    cats: {}
  },
  cats: {
    totalCount: 0
  }
};

export class State {
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
