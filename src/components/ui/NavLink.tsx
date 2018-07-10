import { inject, observer } from "mobx-react";
import * as React from "react";
import { matchPath } from "react-router";
import { RootStore } from "~/store";
import Link, { ILinkProps } from "./Link";

interface INavLinkProps extends ILinkProps {
  activeClassName: string;
  path?: string;
  exact?: boolean;
  strict?: boolean;
}

interface IInjectedProps extends INavLinkProps {
  store: RootStore;
}

const NavLink: React.SFC<INavLinkProps> = props => {
  const {
    href,
    activeClassName,
    className,
    path,
    exact,
    strict,
    store,
    ...rest
  } = props as IInjectedProps;

  const isActive = Boolean(
    matchPath(store.state.history.location.pathname, {
      path: path || href,
      exact,
      strict
    })
  );

  const computedClassName = isActive
    ? [className, activeClassName].filter(Boolean).join(" ")
    : className;

  return <Link href={href} className={computedClassName} {...rest} />;
};

export default inject("store")(observer(NavLink));
