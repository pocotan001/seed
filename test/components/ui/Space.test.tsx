import * as React from "react";
import * as renderer from "react-test-renderer";
import Space from "~/components/ui/Space";

describe("<Space>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Space>alo</Space>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
