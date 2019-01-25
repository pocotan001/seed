import React from "react";
import styled from "styled-components";
import { AuthOperations } from "../../../state/auth/AuthOperations";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

interface DefaultLayoutProps {
  logout?: AuthOperations["logout"];
  className?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  logout,
  className
}) => (
  <div className={className}>
    <Header logout={logout} />
    <Main>{children}</Main>
    <Footer />
  </div>
);

export default styled(DefaultLayout)`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main  "
    "footer";

  ${Header} {
    grid-area: header;
  }

  ${Main} {
    grid-area: main;
  }

  ${Footer} {
    grid-area: footer;
  }
`;
