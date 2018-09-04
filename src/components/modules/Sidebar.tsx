import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";

interface ISidebarProps {
  className?: string;
}

const Sidebar: React.SFC<ISidebarProps> = ({ className }) => (
  <aside className={className}>Sidebar</aside>
);

export default styled(Sidebar)`
  padding: 24px;
  text-align: center;
  background: ${Color.grey100};
`;
