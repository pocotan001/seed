import createFocusTrap, { FocusTrap } from "focus-trap";
import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { ZIndex } from "~/components/styles/theme";
import config from "~/config";
import { ElementId } from "~/domain/Document";
import Backdrop from "./Backdrop";
import Content from "./Content";

interface IModalProps {
  children: React.ReactNode;
  padded?: boolean;
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
  modalContainer = document.getElementById(ElementId.MODAL)!;
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
      padded,
      labelledBy,
      describedBy,
      className,
      onRequestClose
    } = this.props;

    return ReactDOM.createPortal(
      <div
        className={className}
        ref={this.el}
        role="dialog"
        aria-modal
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
      >
        <Backdrop onClick={onRequestClose} />
        <Content padded={padded} actived={this.state.isActive}>
          {children}
        </Content>
      </div>,
      modalContainer
    );
  }
}

export default styled(Modal)`
  position: fixed;
  z-index: ${ZIndex.modal};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
