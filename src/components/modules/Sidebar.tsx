import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";

interface ISidebarProps {
  className?: string;
}

const Sidebar: React.SFC<ISidebarProps> = ({ className }) => (
  <aside className={className}>Sidebar</aside>
);

export default styled(Sidebar)`
  padding: 24px;
  text-align: center;
  background: ${({ theme }) => theme.colors.grey100};
`;
