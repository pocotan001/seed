import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import TextField from "~/components/ui/TextField";

const handleSubmit = () => undefined;

describe("<TextField>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => <TextField name="test" autoComplete="nope" />}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
