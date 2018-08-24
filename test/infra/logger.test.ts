import * as debug from "debug";
import createLogger, { enables, Logger } from "~/infra/logger";

describe("Logger", () => {
  describe("createLogger(namespace, opts)", () => {
    it("should return a `Logger` instance", () => {
      const logger = createLogger("test");

      expect(logger).toBeInstanceOf(Logger);
      expect(logger).toHaveProperty("namespace", "test");
    });

    it("should return a function with log methods", () => {
      const logger = createLogger("test");

      expect(logger).toHaveProperty("error", expect.any(Function));
      expect(logger).toHaveProperty("warn", expect.any(Function));
      expect(logger).toHaveProperty("info", expect.any(Function));
      expect(logger).toHaveProperty("debug", expect.any(Function));
    });

    it("should able to cache logger", () => {
      const logger = createLogger("test");

      expect(logger).toBe(createLogger("test"));
    });
  });

  describe("#isEnabled", () => {
    it("should return true", () => {
      const logger = createLogger("test");

      expect(logger.isEnabled).toBe(true);
    });
  });

  describe("#enable()", () => {
    it("should be enabled", () => {
      const original = Array.from(enables).join(",");
      const logger = createLogger("test");

      logger.enable();

      expect(logger.isEnabled).toBe(true);
      debug.enable(original);
    });
  });

  describe("#disable()", () => {
    it("should be disabled", () => {
      const original = Array.from(enables).join(",");
      const logger = createLogger("test");

      logger.disable();

      expect(logger.isEnabled).toBe(false);
      debug.enable(original);
    });
  });
});
