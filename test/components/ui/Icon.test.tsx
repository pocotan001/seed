import * as React from "react";
import * as renderer from "react-test-renderer";
import Icon from "~/components/ui/Icon";

const SVG_STRING = [
  `<svg width="100" height="100">`,
  `<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="tomato" />`,
  `</svg>`
].join("");

describe("<Icon>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Icon src={SVG_STRING} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
