import { pick } from "lodash";
import * as React from "react";

type RenderNode = (isIntersecting: boolean) => React.ReactNode;

interface ObserverProps extends IntersectionObserverInit {
  children: RenderNode | React.ReactNode;
  once?: boolean;
  onEnter?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
  onLeave?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
}

interface ObserverState {
  isIntersecting: boolean;
}

/**
 * Acting as a wrapper for the `IntersectionObserver` API
 */
export default class Observer extends React.PureComponent<
  ObserverProps,
  ObserverState
> {
  state = {
    isIntersecting: false
  };

  el = React.createRef<Element>();
  observer!: IntersectionObserver;

  handleIntersection: IntersectionObserverCallback = (entries, observer) => {
    const { once, onEnter, onLeave } = this.props;
    const [entry] = entries;
    const { isIntersecting } = entry;
    const hasChange = this.state.isIntersecting !== isIntersecting;

    if (!hasChange) {
      return;
    }

    if (isIntersecting) {
      if (onEnter) {
        onEnter(entry, observer);
      }

      if (once) {
        this.observer.unobserve(this.el.current!);
      }
    } else if (onLeave) {
      onLeave(entry, observer);
    }

    this.setState({ isIntersecting });
  };

  componentDidMount() {
    const opts: IntersectionObserverInit = pick(this.props, [
      "root",
      "rootMargin",
      "threshold"
    ]);

    this.observer = new IntersectionObserver(this.handleIntersection, opts);
    this.observer.observe(this.el.current!);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.el.current!);
  }

  render() {
    const { children } = this.props;
    const el =
      typeof children === "function"
        ? children(this.state.isIntersecting)
        : children;

    return React.cloneElement(React.Children.only(el), {
      ref: this.el
    });
  }
}
