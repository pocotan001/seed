import React from "react";
import styled from "styled-components";

interface FallbackProps {
  className?: string;
}

const Fallback: React.FC<FallbackProps> = ({ className }) => (
  <div className={className}>
    <p>Loading ...</p>
  </div>
);

export default styled(Fallback)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
