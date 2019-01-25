import React from "react";
import styled from "styled-components";
import { Color } from "../../styles/enums";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => (
  <footer className={className}>
    <p>
      <small>© All rights reserved.</small>
    </p>
  </footer>
);

export default styled(Footer)`
  padding: 24px;
  text-align: center;
  color: ${Color.Grey600};
`;
