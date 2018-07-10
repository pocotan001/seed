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
  intersecting: boolean;
}

/**
 * Acting as a wrapper for the `IntersectionObserver` API
 */
export default class Observer extends React.PureComponent<
  IObserverProps,
  IObserverState
> {
  static defaultProps: Partial<IObserverProps> = {
    onChange: () => undefined,
    onEnter: () => undefined,
    onLeave: () => undefined
  };

  state = {
    intersecting: false
  };

  observer?: IntersectionObserver;
  el = React.createRef<Element>();

  handleIntersection: IntersectionObserverCallback = entries => {
    const { once, onChange, onEnter, onLeave } = this.props;
    const [entry] = entries;
    const intersecting = entry.isIntersecting;
    const hasChange = this.state.intersecting !== intersecting;

    if (!hasChange) {
      return;
    }

    onChange!(entry);

    if (intersecting) {
      onEnter!(entry);

      if (once) {
        this.observer!.unobserve(this.el.current!);
      }
    } else {
      onLeave!(entry);
    }

    this.setState({ intersecting });
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
    this.observer!.unobserve(this.el.current!);
  }

  render() {
    const { children } = this.props;
    const el =
      typeof children === "function"
        ? children(this.state.intersecting)
        : children;

    return React.cloneElement(React.Children.only(el), {
      ref: this.el
    });
  }
}
