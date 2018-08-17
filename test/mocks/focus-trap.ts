import { FocusTrap } from "focus-trap";

const createFocusTrap = (): FocusTrap => ({
  activate: () => undefined,
  deactivate: () => undefined,
  pause: () => undefined,
  unpause: () => undefined
});

export default createFocusTrap;
