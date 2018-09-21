import * as React from "react";
import * as renderer from "react-test-renderer";
import AutoSave from "~/components/ui/AutoSave";
import Form from "~/components/ui/Form";

const handleSubmit = () => undefined;
const save = () => undefined;

describe("<AutoSave>", () => {
  it("should render correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => <AutoSave onRequestSave={save} />}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
