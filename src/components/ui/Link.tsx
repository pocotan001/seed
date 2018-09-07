import { inject } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { RootStore } from "~/store";

type MouseEvent = React.MouseEvent<HTMLAnchorElement>;

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  block?: boolean;
  store?: RootStore;
}

const isLeftClick = (e: MouseEvent): boolean => e.button === 0;
const isModifiedEvent = (e: MouseEvent): boolean =>
  Boolean(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);

@inject("store")
export class Link extends React.PureComponent<LinkProps> {
  store = this.props.store!;

  handleClick = (e: MouseEvent) => {
    const { href, target, onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    if (target || e.defaultPrevented || !isLeftClick(e) || isModifiedEvent(e)) {
      return;
    }

    e.preventDefault();

    this.store.history.push(href);
  };

  render() {
    const { href, children, block, onClick, store, ...rest } = this.props;

    if (rest.target === "_blank") {
      rest.rel = rest.rel || "noopener noreferrer";
    }

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
