// tslint:disable:max-classes-per-file

describe("@debounce", () => {
  it("should call debounce", () => {
    jest.useFakeTimers();
    const { debounce } = require("~/infra/decorators");

    class Test {
      @debounce(1000)
      method() {
        return true;
      }
    }

    new Test().method();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});

describe("@throttle", () => {
  it("should call throttle", () => {
    jest.useFakeTimers();
    const { throttle } = require("~/infra/decorators");

    class Test {
      @throttle(1000)
      method() {
        return true;
      }
    }

    new Test().method();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
