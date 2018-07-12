import * as React from "react";
import * as renderer from "react-test-renderer";
import NavLink from "~/components/ui/NavLink";
import { RootStore } from "~/store";
import { defaultState } from "~/store/state";

let store: RootStore;

describe("<NavLink>", () => {
  beforeEach(() => {
    store = {
      state: { ...defaultState },
      history: {
        push: () => undefined
      }
    } as any;
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <NavLink href="/a" activeClassName="a" store={store}>
          alo
        </NavLink>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("changes the class name when actived", () => {
    store.state.history.location.pathname = "/a";

    const tree = renderer
      .create(
        <NavLink href="/a" activeClassName="a" store={store}>
          alo
        </NavLink>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
