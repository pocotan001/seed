import * as React from "react";
import styled from "styled-components";
import { colors } from "~/components/styles/theme";

interface IFooterProps {
  className?: string;
}

const Footer: React.SFC<IFooterProps> = ({ className }) => (
  <footer className={className}>Footer</footer>
);

export default styled(Footer)`
  padding: 24px;
  text-align: center;
  border-top: 1px solid ${colors.grey200};
`;
