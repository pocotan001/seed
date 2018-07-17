import { pick } from "lodash";
import * as React from "react";

type IRenderNode = (isIntersecting: boolean) => React.ReactNode;

interface IObserverProps extends IntersectionObserverInit {
  children: React.ReactNode | IRenderNode;
  once?: boolean;
  onChange?: (entry: IntersectionObserverEntry) => void;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
}

interface IObserverState {
  isIntersecting: boolean;
}

/**
 * Acting as a wrapper for the `IntersectionObserver` API
 */
export default class Observer extends React.PureComponent<
  IObserverProps,
  IObserverState
> {
  state = {
    isIntersecting: false
  };

  el = React.createRef<Element>();
  observer!: IntersectionObserver;

  handleIntersection: IntersectionObserverCallback = entries => {
    const { once, onChange, onEnter, onLeave } = this.props;
    const [entry] = entries;
    const { isIntersecting } = entry;
    const hasChange = this.state.isIntersecting !== isIntersecting;

    if (!hasChange) {
      return;
    }

    if (onChange) {
      onChange(entry);
    }

    if (isIntersecting) {
      if (onEnter) {
        onEnter(entry);
      }

      if (once) {
        this.observer!.unobserve(this.el.current!);
      }
    } else if (onLeave) {
      onLeave(entry);
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
