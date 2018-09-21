import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import Radio from "~/components/ui/Radio";

const handleSubmit = () => undefined;

describe("<Radio>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => (
            <Radio name="radio" value="a">
              A
            </Radio>
          )}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
