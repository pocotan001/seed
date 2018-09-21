import * as React from "react";
import * as renderer from "react-test-renderer";
import CheckBox from "~/components/ui/CheckBox";
import Form from "~/components/ui/Form";

const handleSubmit = () => undefined;

describe("<CheckBox>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => (
            <CheckBox name="checkbox" value="a">
              A
            </CheckBox>
          )}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
