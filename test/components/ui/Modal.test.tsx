import * as React from "react";
import * as renderer from "react-test-renderer";

jest.mock("focus-trap", () => require("../../mocks/focus-trap"));

const close = () => undefined;

describe("<Modal>", () => {
  it("renders correctly on client", () => {
    jest.doMock("react-dom", () => ({
      createPortal: (node: React.ReactNode) => node
    }));

    jest.doMock("~/config", () => ({
      isServer: false,
      isClient: true
    }));

    const Modal = require("~/components/ui/Modal").default;
    const tree = renderer
      .create(<Modal onRequestClose={close}>alo</Modal>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
