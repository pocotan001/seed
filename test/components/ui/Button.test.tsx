import * as React from "react";
import * as renderer from "react-test-renderer";
import theme from "~/components/styles/theme";
import Button from "~/components/ui/Button";

describe("<Button>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Button theme={theme}>alo</Button>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
