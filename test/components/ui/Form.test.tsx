import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";

const handleSubmit = () => undefined;

describe("<Form>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(<Form onSubmit={handleSubmit}>{() => "Alo"}</Form>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
