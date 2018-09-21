import * as React from "react";
import * as renderer from "react-test-renderer";
import Button from "~/components/ui/Button";

describe("<Button>", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Button>alo</Button>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
