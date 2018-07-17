import createFocusTrap, { FocusTrap } from "focus-trap";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "~/components/styles/themedStyledComponents";
import config from "~/config";
import { ElementId } from "~/enums/Dom";

interface IModalProps {
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
  className?: string;
  onRequestClose: () => void;
}

interface IModalState {
  isActive: boolean;
}

let appContainer: Element;
let modalContainer: Element;

if (config.isClient) {
  appContainer = document.getElementById(ElementId.APP)!;
  modalContainer = document.getElementById(ElementId.MODAL_CONTAINER)!;
}

/**
 * An accessible modal dialog built according WAI-ARIA authoring practices
 * https://www.w3.org/TR/wai-aria-practices/#dialog_modal
 */
class Modal extends React.PureComponent<IModalProps, IModalState> {
  state = {
    isActive: false
  };

  el = React.createRef<HTMLDivElement>();
  focusTrap!: FocusTrap;

  handleActivate = () => {
    this.setState({ isActive: true });
  };

  handleDeactivate = () => {
    this.props.onRequestClose();
  };

  componentDidMount() {
    this.focusTrap = createFocusTrap(this.el.current!, {
      onActivate: this.handleActivate,
      onDeactivate: this.handleDeactivate
    });

    this.focusTrap.activate();
    appContainer.setAttribute("aria-hidden", "true");
  }

  componentWillUnmount() {
    this.focusTrap.deactivate();
    appContainer.removeAttribute("aria-hidden");
  }

  render() {
    // `ReactDOM.createPortal` does not work well on server-side
    if (config.isServer) {
      return null;
    }

    const {
      children,
      labelledBy,
      describedBy,
      className,
      onRequestClose
    } = this.props;

    const computedClassName = this.state.isActive
      ? [className, "-actived"].filter(Boolean).join(" ")
      : className;

    return ReactDOM.createPortal(
      <div
        className={computedClassName}
        ref={this.el}
        role="dialog"
        aria-modal
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        <div
          className="backdrop"
          tabIndex={-1}
          role="presentation"
          onClick={onRequestClose}
        />
        <div className="content">{children}</div>
      </div>,
      modalContainer
    );
  }
}

export default styled(Modal)`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  > .content {
    position: relative;
    overflow: auto;
    width: 640px;
    max-width: calc(100% - 24px);
    max-height: calc(100% - 24px);
    margin: 24px;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.2s, transform 0.2s;
    -webkit-overflow-scrolling: touch;
  }

  &.-actived > .content {
    opacity: 1;
    transform: scale(1);
  }
`;
