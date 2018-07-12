import * as React from "react";
import * as renderer from "react-test-renderer";
import theme from "~/components/styles/theme";
import Content from "~/components/ui/Content";

describe("<Content>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Content theme={theme}>alo</Content>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
