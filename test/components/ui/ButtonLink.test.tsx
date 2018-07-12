import * as React from "react";
import * as renderer from "react-test-renderer";
import theme from "~/components/styles/theme";
import ButtonLink from "~/components/ui/ButtonLink";
import { RootStore } from "~/store";
import { defaultState } from "~/store/state";

let store: RootStore;

describe("<ButtonLink>", () => {
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
        <ButtonLink href="/a" store={store} theme={theme}>
          alo
        </ButtonLink>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
