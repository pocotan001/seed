import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";
import { Grid, Heading, Link } from "~/components/ui";
import config from "~/config";
import Nav from "./Nav";

interface IHeaderProps {
  className?: string;
}

const Header: React.SFC<IHeaderProps> = ({ className }) => (
  <header className={className}>
    <Grid cols="auto 1fr">
      <Grid.Cell align="center">
        <Heading>
          <Link href="/">{config.siteName}</Link>
        </Heading>
      </Grid.Cell>
      <Grid.Cell justify="right" align="center">
        <Nav />
      </Grid.Cell>
    </Grid>
  </header>
);

export default styled(Header)`
  padding: 24px;
  border-bottom: 1px solid ${Color.grey200};
  background: ${Color.white};
`;
