import * as React from "react";
import * as renderer from "react-test-renderer";
import Heading from "~/components/ui/Heading";

describe("<Heading>", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Heading>alo</Heading>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
