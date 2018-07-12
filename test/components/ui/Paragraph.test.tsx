import * as React from "react";
import * as renderer from "react-test-renderer";
import Paragraph from "~/components/ui/Paragraph";

describe("<Paragraph>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Paragraph>alo</Paragraph>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
