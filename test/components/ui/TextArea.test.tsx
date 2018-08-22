import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import TextArea from "~/components/ui/TextArea";

const handleSubmit = () => undefined;

describe("<TextArea>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => <TextArea name="textarea" />}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
