import "../tools/env";

import MockIntersectionObserver from "./__mocks__/MockIntersectionObserver";

(global as any).IntersectionObserver = MockIntersectionObserver;
