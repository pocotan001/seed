import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";
import { RootStore } from "~/store";

interface ILoadingProps {
  className?: string;
}

interface IInjectedProps extends ILoadingProps {
  store: RootStore;
}

const Loading: React.SFC<ILoadingProps> = props => {
  const { className, store } = props as IInjectedProps;
  const { percent, hidden } = store.state.loading;

  return (
    <progress
      className={className}
      value={percent}
      max={100}
      aria-hidden={hidden}
    />
  );
};

const InjectedLoading = inject("store")(observer(Loading));

export default styled(InjectedLoading)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.loading};
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
    background: ${({ theme }) => theme.colors.pink300};
    transition: width 0.2s;
  }

  &::-moz-progress-bar {
    background: ${({ theme }) => theme.colors.pink300};
    transition: width 0.2s;
  }
`;
