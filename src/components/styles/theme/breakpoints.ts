export type IBreakpointKey = keyof typeof breakpoints;

const breakpoints = Object.freeze({
  tablet: 768,
  phone: 376
});

export default breakpoints;
