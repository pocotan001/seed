import * as React from "react";
import * as renderer from "react-test-renderer";
import Image from "~/components/ui/Image";

describe("<Image>", () => {
  it("should render correctly", () => {
    const tree = renderer.create(<Image src="/alo" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders as it is when data uri is set", () => {
    const tree = renderer
      .create(
        <Image src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=" />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
