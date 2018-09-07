import * as React from "react";
import styled from "styled-components";

interface MainProps {
  children: React.ReactNode;
}

const Main = styled<MainProps, "main">("main")`
  padding: 24px;
`;

export default Main;
