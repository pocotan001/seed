import React from "react";
import styled from "styled-components";
import { Color, ZIndex } from "../../styles/enums";

interface LoadingProps {
  hidden: boolean;
  percent: number;
  className?: string;
}
const Loading: React.FC<LoadingProps> = ({ hidden, percent, className }) => (
  <progress
    className={className}
    value={percent}
    max={100}
    aria-hidden={hidden}
  />
);

export default styled(Loading)`
  position: fixed;
  z-index: ${ZIndex.Loading};
  top: 0;
  left: 0;
  opacity: 1;
  visibility: visible;
  width: 100%;
  height: 2px;
  transition-property: opacity, visibility;
  transition-duration: 0.3s;

  &[aria-hidden="true"] {
    opacity: 0;
    visibility: hidden;
  }

  &::-webkit-progress-value {
    background: ${Color.Pink300};
    transition: width 0.2s;
  }

  &::-moz-progress-bar {
    background: ${Color.Pink300};
    transition: width 0.2s;
  }

  &::-ms-fill {
    background: ${Color.Pink300};
    transition: width 0.2s;
  }
`;
