import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";
import Select from "~/components/ui/Select";

const handleSubmit = () => undefined;

describe("<Select>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => (
            <Select name="select">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
            </Select>
          )}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
