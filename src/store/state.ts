import { createLocation, Location } from "history";
import { extendObservable, observable } from "mobx";
import config from "~/config";
import { IApiResponse, INormalizedEntities } from "~/domain/entities";

export const defaultState: State = Object.freeze({
  history: {
    location: createLocation(""),
    visited: {}
  },
  head: {
    title: config.siteName,
    meta: []
  },
  loading: {
    percent: 0,
    hidden: true
  },
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
  history!: {
    location: Location;
    visited: { [key: string]: boolean };
  };

  head!: {
    title: string;
    meta: Array<React.MetaHTMLAttributes<HTMLMetaElement>>;
  };

  loading!: {
    percent: number;
    hidden: boolean;
  };

  entities!: INormalizedEntities;

  results!: Record<
    "cats",
    {
      [serializedParams: string]: IApiResponse["result"];
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
