export default class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  disconnect = () => undefined;
  observe = () => undefined;
  takeRecords = () => undefined as any;
  unobserve = () => undefined;
}
