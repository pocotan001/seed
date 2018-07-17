import "../tools/env";
import MockIntersectionObserver from "./mocks/IntersectionObserver";

(global as any).IntersectionObserver = MockIntersectionObserver;
