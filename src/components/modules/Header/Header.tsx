import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";
import { Grid, GridCell } from "~/components/ui/Grid";
import Heading from "~/components/ui/Heading";
import Link from "~/components/ui/Link";
import config from "~/config";
import Nav from "./Nav";

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
        <Nav />
      </GridCell>
    </Grid>
  </header>
);

export default styled(Header)`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};
  background: ${({ theme }) => theme.colors.white};
`;
