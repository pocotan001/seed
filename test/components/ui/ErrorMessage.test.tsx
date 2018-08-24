import * as React from "react";
import * as renderer from "react-test-renderer";
import ErrorMessage from "~/components/ui/ErrorMessage";

describe("<ErrorMessage>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ErrorMessage>alo</ErrorMessage>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
