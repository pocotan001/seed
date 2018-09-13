import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";
import { Grid, Heading, Link } from "~/components/ui";
import config from "~/config";
import Nav from "./Nav";

interface HeaderProps {
  className?: string;
}

const Header: React.SFC<HeaderProps> = ({ className }) => (
  <header className={className}>
    <Grid cols="auto 1fr" phone={{ cols: "auto" }}>
      <Grid.Cell>
        <Heading>
          <Link href="/">{config.siteName}</Link>
        </Heading>
      </Grid.Cell>
      <Grid.Cell justify="right">
        <Nav />
      </Grid.Cell>
    </Grid>
  </header>
);

export default styled(Header)`
  padding: 24px;
  border-bottom: 1px solid ${Color.Grey200};
  background: ${Color.White};
`;
