import "../tools/env";

import MockIntersectionObserver from "./mocks/MockIntersectionObserver";

(global as any).IntersectionObserver = MockIntersectionObserver;
