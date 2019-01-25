import React from "react";
import styled from "styled-components";
import { AuthOperations } from "../../../../state/auth/AuthOperations";
import { Color } from "../../../styles/enums";
import Grid from "../../../ui/Grid";
import Text from "../../../ui/Text";
import Logout from "./Logout";

interface HeaderProps {
  logout?: AuthOperations["logout"];
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ logout, className }) => (
  <header className={className}>
    <Grid cols="auto 1fr" align="center">
      <Grid.Cell>
        <Text as="h1" fz={24} fw="normal">
          Seed
        </Text>
      </Grid.Cell>
      <Grid.Cell justify="right">
        {logout && <Logout logout={logout} />}
      </Grid.Cell>
    </Grid>
  </header>
);

export default styled(Header)`
  padding: 8px 24px;
  color: ${Color.White};
  background-color: ${Color.Grey900};
  border-bottom: 1px solid ${Color.Grey200};
`;
