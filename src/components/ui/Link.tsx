import { inject } from "mobx-react";
import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";
import { RootStore } from "~/store";

type IMouseEvent = React.MouseEvent<HTMLAnchorElement>;

export interface ILinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  block?: boolean;
}

interface IInjectedProps extends ILinkProps {
  store?: RootStore;
}

const isLeftClick = (e: IMouseEvent): boolean => e.button === 0;
const isModifiedEvent = (e: IMouseEvent): boolean =>
  Boolean(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);

@inject("store")
export class Link extends React.PureComponent<IInjectedProps> {
  store = this.props.store!;

  handleClick = (e: IMouseEvent) => {
    const { href, target, onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    if (target || e.defaultPrevented || !isLeftClick(e) || isModifiedEvent(e)) {
      return;
    }

    e.preventDefault();

    if (href === this.store.state.history.location.pathname) {
      return;
    }

    this.store.history.push(href);
  };

  render() {
    const { href, children, block, onClick, store, ...rest } = this.props;

    return (
      <a href={href} onClick={this.handleClick} {...rest}>
        {children}
      </a>
    );
  }
}

export default styled(Link)`
  display: inline-block;
  max-width: 100%;
  text-decoration: none;
  color: currentColor;
  ${({ block }) => block && "display: block;"};
`;
