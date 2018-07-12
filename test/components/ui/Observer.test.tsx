import * as React from "react";
import * as renderer from "react-test-renderer";
import Observer from "~/components/ui/Observer";

describe("<Observer>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Observer>
          <div>alo</div>
        </Observer>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
