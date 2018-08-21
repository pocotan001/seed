import buildFormValidator from "~/utils/buildFormValidator";

describe("buildFormValidator(validator, error)", () => {
  it("should return undefined for valid value", () => {
    const isRequired = jest.fn(value => Boolean(value));
    const validator = buildFormValidator(isRequired, "required");

    expect(validator("alo")).toBe(undefined);
    expect(isRequired).toHaveBeenCalledTimes(1);
    expect(isRequired).toHaveBeenCalledWith("alo");
  });

  it("should return error message for invalid value", () => {
    const isRequired = jest.fn(value => Boolean(value));
    const validator = buildFormValidator(isRequired, "required");

    expect(validator("")).toBe("required");
    expect(isRequired).toHaveBeenCalledTimes(1);
    expect(isRequired).toHaveBeenCalledWith("");
  });
});
