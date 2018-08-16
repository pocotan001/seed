import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { colors } from "~/components/styles/theme";
import { NavLink } from "~/components/ui";

interface IPaginationProps extends IMarginProps {
  total: number;
  per: number;
  href: (page: number) => string;
  className?: string;
}

const Pagination: React.SFC<IPaginationProps> = ({
  total,
  per,
  href,
  className
}) => {
  const pages = Array.from(Array(total / per).keys()).map(i => i + 1);

  return (
    <ol className={className}>
      {pages.map(page => (
        <li key={page}>
          <NavLink href={href(page)} activeClassName="-actived">
            {page}
          </NavLink>
        </li>
      ))}
    </ol>
  );
};

export default styled(Pagination)`
  text-align: center;
  ${margin};

  li {
    display: inline-block;
    margin: 0 4px;

    a {
      width: 2em;
      height: 2em;
      line-height: 2em;
      text-align: center;
      border-radius: 50%;

      &:hover,
      &.-actived {
        color: ${colors.white};
        background: ${colors.pink300};
      }
    }
  }
`;
