import composeFormValidators from "~/utils/composeFormValidators";

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
