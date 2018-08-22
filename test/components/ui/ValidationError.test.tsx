import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import ValidationError from "~/components/ui/ValidationError";

const handleSubmit = () => undefined;

describe("<ValidationError>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => <ValidationError name="a" />}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
