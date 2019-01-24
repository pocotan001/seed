import React from "react";
import styled from "styled-components";
import { AuthOperations } from "../../../state/auth/AuthOperations";

interface LogoutProps {
  logout: AuthOperations["logout"];
  className?: string;
}

const Logout: React.FC<LogoutProps> = ({ logout, className }) => (
  <button className={className} type="button" onClick={logout}>
    Logout
  </button>
);

export default styled(Logout)`
  color: currentColor;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
