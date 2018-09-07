import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";

interface FooterProps {
  className?: string;
}

const Footer: React.SFC<FooterProps> = ({ className }) => (
  <footer className={className}>Footer</footer>
);

export default styled(Footer)`
  padding: 24px;
  text-align: center;
  border-top: 1px solid ${Color.Grey200};
`;
