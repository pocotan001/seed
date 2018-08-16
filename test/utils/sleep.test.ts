describe("sleep(ms)", () => {
  it("should sleep", () => {
    jest.useFakeTimers();
    const sleep = require("~/utils/sleep").default;

    sleep(1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000);
  });
});
