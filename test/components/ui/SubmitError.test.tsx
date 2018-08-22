import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import SubmitError from "~/components/ui/SubmitError";

const handleSubmit = () => undefined;

describe("<SubmitError>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Form onSubmit={handleSubmit}>{() => <SubmitError />}</Form>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
