import * as React from "react";
import * as renderer from "react-test-renderer";
import Link from "~/components/ui/Link";
import { RootStore } from "~/store";
import { defaultState } from "~/store/state";

let store: RootStore;

describe("<Link>", () => {
  beforeEach(() => {
    store = {
      state: { ...defaultState },
      history: {
        push: jest.fn()
      }
    } as any;
  });

  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Link href="/a" store={store}>
          alo
        </Link>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should call `history.push` if clicked", () => {
    const tree = renderer
      .create(
        <Link href="/a" store={store}>
          alo
        </Link>
      )
      .toJSON();

    const event: any = {
      button: 0,
      defaultPrevented: false,
      preventDefault: () => undefined
    };

    tree!.props.onClick(event);

    expect(store.history.push).toHaveBeenCalledTimes(1);
    expect(store.history.push).toHaveBeenCalledWith("/a");
    expect(tree).toMatchSnapshot();
  });
});
