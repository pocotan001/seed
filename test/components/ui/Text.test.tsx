import * as React from "react";
import * as renderer from "react-test-renderer";
import Text from "~/components/ui/Text";

describe("<Text>", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Text>alo</Text>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
