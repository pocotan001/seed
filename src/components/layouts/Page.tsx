import * as React from "react";
import styled from "styled-components";
import { Footer, Header, Main, Sidebar } from "~/components/modules";
import media from "~/components/styles/mixins/media";
import { dimensions } from "~/components/styles/theme";
import { px } from "~/utils";

interface IPageProps {
  children: React.ReactNode;
  className?: string;
}

const Page: React.SFC<IPageProps> = ({ children, className }) => (
  <div className={className}>
    <Header />
    <Main>{children}</Main>
    <Sidebar />
    <Footer />
  </div>
);

export default styled(Page)`
  display: grid;
  min-height: 100vh;
  grid-template-columns:
    calc(100% - ${px(dimensions.sidebarWidth)})
    ${px(dimensions.sidebarWidth)};
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "main   sidebar"
    "footer footer";

  ${Header} {
    grid-area: header;
  }

  ${Main} {
    grid-area: main;
  }

  ${Sidebar} {
    grid-area: sidebar;
  }

  ${Footer} {
    grid-area: footer;
  }

  ${media.tablet`
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto auto;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  `};
`;
