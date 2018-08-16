import * as React from "react";
import * as renderer from "react-test-renderer";
import Content from "~/components/ui/Content";

describe("<Content>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Content>alo</Content>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
