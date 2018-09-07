import "regenerator-runtime/runtime";
import "../tools/env";

import { ElementId } from "~/domain/Document";
import MockIntersectionObserver from "./mocks/IntersectionObserver";

(global as any).IntersectionObserver = MockIntersectionObserver;

// tslint:disable-next-line:no-inner-html
document.body.innerHTML = [
  `<div id="${ElementId.App}"></div>`,
  `<div id="${ElementId.Modal}"></div>`
].join("");
