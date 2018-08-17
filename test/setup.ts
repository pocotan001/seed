import "../tools/env";

import * as ElementId from "~/constants/ElementId";
import MockIntersectionObserver from "./mocks/IntersectionObserver";

(global as any).IntersectionObserver = MockIntersectionObserver;

// tslint:disable-next-line:no-inner-html
document.body.innerHTML = [
  `<div id="${ElementId.APP}"></div>`,
  `<div id="${ElementId.MODAL_CONTAINER}"></div>`
].join("");
