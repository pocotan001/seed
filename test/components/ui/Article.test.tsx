import * as React from "react";
import * as renderer from "react-test-renderer";
import Article from "~/components/ui/Article";

describe("<Article>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Article>alo</Article>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
