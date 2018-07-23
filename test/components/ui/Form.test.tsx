import * as React from "react";
import * as renderer from "react-test-renderer";
import theme from "~/components/styles/theme";
import {
  composeFormValidators,
  createFormValidator,
  Form,
  SubmitError,
  TextField,
  ValidationError
} from "~/components/ui/Form";

const handleSubmit = () => undefined;

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
          {() => <TextField name="a" theme={theme} />}
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

describe("createFormValidator(validator, error)", () => {
  it("should return undefined for valid value", () => {
    const isRequired = jest.fn(value => Boolean(value));
    const validator = createFormValidator(isRequired, "required");

    expect(validator("alo")).toBe(undefined);
    expect(isRequired).toHaveBeenCalledTimes(1);
    expect(isRequired).toHaveBeenCalledWith("alo");
  });

  it("should return error message for invalid value", () => {
    const isRequired = jest.fn(value => Boolean(value));
    const validator = createFormValidator(isRequired, "required");

    expect(validator("")).toBe("required");
    expect(isRequired).toHaveBeenCalledTimes(1);
    expect(isRequired).toHaveBeenCalledWith("");
  });
});

describe("composeFormValidators(...validators)", () => {
  it("should return undefined for valid value", () => {
    const containsA = jest.fn(
      value => (value.includes("A") ? undefined : "does not contains A")
    );
    const containsB = jest.fn(
      value => (value.includes("B") ? undefined : "does not contains B")
    );
    const validator = composeFormValidators(containsA, containsB);

    expect(validator("AB")).toBe(undefined);
    expect(containsA).toHaveBeenCalledTimes(1);
    expect(containsA).toHaveBeenCalledWith("AB");
    expect(containsA).toHaveReturnedWith(undefined);
    expect(containsB).toHaveBeenCalledTimes(1);
    expect(containsB).toHaveBeenCalledWith("AB");
    expect(containsB).toHaveReturnedWith(undefined);
  });

  it("should return error message for invalid value", () => {
    const containsA = jest.fn(
      value => (value.includes("A") ? undefined : "does not contains A")
    );
    const containsB = jest.fn(
      value => (value.includes("B") ? undefined : "does not contains B")
    );
    const validator = composeFormValidators(containsA, containsB);

    expect(validator("A")).toBe("does not contains B");
    expect(containsA).toHaveBeenCalledTimes(1);
    expect(containsA).toHaveBeenCalledWith("A");
    expect(containsA).toHaveReturnedWith(undefined);
    expect(containsB).toHaveBeenCalledTimes(1);
    expect(containsB).toHaveBeenCalledWith("A");
    expect(containsB).toHaveReturnedWith("does not contains B");

    containsA.mockClear();
    containsB.mockClear();

    expect(validator("B")).toBe("does not contains A");
    expect(containsA).toHaveBeenCalledTimes(1);
    expect(containsA).toHaveBeenCalledWith("B");
    expect(containsA).toHaveReturnedWith("does not contains A");
    expect(containsB).not.toHaveBeenCalled();
  });
});
