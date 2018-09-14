import { inject } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";
import { RootStore } from "~/store";

type MouseEvent = React.MouseEvent<HTMLAnchorElement>;

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  asText?: boolean;
  store?: RootStore;
}

const isAnchorLink = (href: string): boolean => href.indexOf("#") === 0;
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

    if (
      target ||
      e.defaultPrevented ||
      isAnchorLink(href) ||
      !isLeftClick(e) ||
      isModifiedEvent(e)
    ) {
      return;
    }

    e.preventDefault();

    if (href === this.store.state.history.location.pathname) {
      return;
    }

    this.store.history.push(href);
  };

  render() {
    const { href, children, asText, onClick, store, ...rest } = this.props;

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

  ${({ asText }) =>
    asText &&
    `
    color: ${Color.Pink500};

    &:hover {
      text-decoration: underline;
    }
  `};
`;
