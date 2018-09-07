import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.SFC<SidebarProps> = ({ className }) => (
  <aside className={className}>Sidebar</aside>
);

export default styled(Sidebar)`
  padding: 24px;
  text-align: center;
  background: ${Color.Grey100};
`;
