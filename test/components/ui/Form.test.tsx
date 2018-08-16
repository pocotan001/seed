import * as React from "react";
import * as renderer from "react-test-renderer";
import Form from "~/components/ui/Form";

const {
  TextField,
  TextArea,
  Select,
  CheckBox,
  Radio,
  AutoSave,
  ValidationError,
  SubmitError
} = Form;

const handleSubmit = () => undefined;
const save = () => undefined;

describe("<Form>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Form onSubmit={handleSubmit}>{() => "Alo"}</Form>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe("<TextField>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Form onSubmit={handleSubmit}>
          {() => <TextField name="textfield" />}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

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

describe("<Select>", () => {
  it("renders correctly", () => {
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

describe("<CheckBox>", () => {
  it("renders correctly", () => {
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

describe("<Radio>", () => {
  it("renders correctly", () => {
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

describe("<AutoSave>", () => {
  it("renders correctly", () => {
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

describe("<SubmitError>", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Form onSubmit={handleSubmit}>{() => <SubmitError />}</Form>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
