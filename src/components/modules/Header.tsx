import * as React from "react";
import media from "~/components/styles/mixins/media";
import styled from "~/components/styles/themedStyledComponents";
import { Grid, GridCell } from "~/components/ui/Grid";
import Heading from "~/components/ui/Heading";
import Link from "~/components/ui/Link";
import NavLink from "~/components/ui/NavLink";
import config from "~/config";

interface IHeaderProps {
  className?: string;
}

const Header: React.SFC<IHeaderProps> = ({ className }) => (
  <header className={className}>
    <Grid cols="auto 1fr">
      <GridCell align="center">
        <Heading>
          <Link href="/">{config.siteName}</Link>
        </Heading>
      </GridCell>
      <GridCell justify="right" align="center">
        <nav className="nav">
          <ul>
            <li>
              <NavLink href="/" exact activeClassName="-actived">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href="/markdown" activeClassName="-actived">
                Markdown
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/cat/1"
                path="/cat/:page"
                activeClassName="-actived"
              >
                Cat
              </NavLink>
            </li>
            <li>
              <NavLink href="/404" activeClassName="-actived">
                Not Found
              </NavLink>
            </li>
          </ul>
        </nav>
      </GridCell>
    </Grid>
  </header>
);

export default styled(Header)`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};
  background: ${({ theme }) => theme.colors.white};

  .nav {
    li {
      display: inline-block;

      & + li {
        margin-left: 4px;
      }
    }

    a {
      padding: 8px 16px;
      border-radius: 5px;

      &:hover,
      &.-actived {
        color: ${({ theme }) => theme.colors.grey800};
        background: ${({ theme }) => theme.colors.grey100};
      }

      ${media.tablet`
        padding: 4px 12px;
      `};
    }
  }
`;
