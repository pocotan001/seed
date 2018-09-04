import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { Color, ZIndex } from "~/components/styles/theme";
import { RootStore } from "~/store";

interface ILoadingProps {
  className?: string;
  store?: RootStore;
}

@inject("store")
@observer
export class Loading extends React.Component<ILoadingProps> {
  store = this.props.store!;

  render() {
    const { className } = this.props;

    return (
      <progress
        className={className}
        value={this.store.state.loading.percent}
        max={100}
        aria-hidden={this.store.state.loading.hidden}
      />
    );
  }
}

export default styled(Loading)`
  position: fixed;
  z-index: ${ZIndex.loading};
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
    background: ${Color.pink300};
    transition: width 0.2s;
  }

  &::-moz-progress-bar {
    background: ${Color.pink300};
    transition: width 0.2s;
  }

  &::-ms-fill {
    background: ${Color.pink300};
    transition: width 0.2s;
  }
`;
