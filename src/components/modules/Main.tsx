import * as React from "react";
import styled from "styled-components";

interface IMainProps {
  children: React.ReactNode;
}

const Main = styled<IMainProps, "main">("main")`
  padding: 24px;
`;

export default Main;
