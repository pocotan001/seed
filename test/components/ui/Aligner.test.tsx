import * as React from "react";
import * as renderer from "react-test-renderer";
import Aligner from "~/components/ui/Aligner";

describe("<Aligner>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Aligner>alo</Aligner>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
