import { inject, observer } from "mobx-react";
import * as React from "react";
import { matchPath } from "react-router";
import { RootStore } from "~/store";
import Link, { LinkProps } from "./Link";

interface NavLinkProps extends LinkProps {
  activeClassName: string;
  path?: string;
  exact?: boolean;
  strict?: boolean;
  store?: RootStore;
}

const NavLink: React.SFC<NavLinkProps> = ({
  href,
  activeClassName,
  className,
  path,
  exact,
  strict,
  store,
  ...rest
}) => {
  const isActive = Boolean(
    matchPath(store!.state.history.location.pathname, {
      exact,
      strict,
      path: path || href
    })
  );

  const computedClassName = isActive
    ? [className, activeClassName].filter(Boolean).join(" ")
    : className;

  return (
    <Link href={href} className={computedClassName} store={store} {...rest} />
  );
};

export default inject("store")(observer(NavLink));
