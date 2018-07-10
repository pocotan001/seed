import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";

interface IFooterProps {
  className?: string;
}

const Footer: React.SFC<IFooterProps> = ({ className }) => (
  <footer className={className}>Footer</footer>
);

export default styled(Footer)`
  padding: 24px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grey200};
`;
