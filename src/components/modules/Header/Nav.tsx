import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { SignInForm } from "~/components/modules";
import { colors } from "~/components/styles/theme";
import { Button, Modal, NavLink } from "~/components/ui";
import { RootStore } from "~/store";

interface INavProps {
  className?: string;
}

interface INavState {
  isSignInModalShown: boolean;
}

@inject("store")
@observer
class Nav extends React.Component<INavProps, INavState> {
  store: RootStore = (this.props as any).store;

  state = {
    isSignInModalShown: false
  };

  signOut = () => {
    this.store.auth.signOut();
  };

  openSignInModal = () => {
    this.setState({ isSignInModalShown: true });
  };

  closeSignInModal = () => {
    this.setState({ isSignInModalShown: false });
  };

  handleSignInSuccess = () => {
    this.closeSignInModal();
    window.scrollTo(0, 0);
  };

  render() {
    const { className } = this.props;

    return (
      <nav className={className}>
        <ul>
          <li>
            <NavLink href="/" exact activeClassName="-actived">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href="/markdown" activeClassName="-actived">
              Markdown
            </NavLink>
          </li>
          <li>
            <NavLink href="/cat/1" path="/cat/:page" activeClassName="-actived">
              Cat
            </NavLink>
          </li>
          <li>
            <NavLink href="/404" activeClassName="-actived">
              Not Found
            </NavLink>
          </li>
          <li>
            {this.store.auth.isSignedIn ? (
              <Button onClick={this.signOut}>Sign Out</Button>
            ) : (
              <Button onClick={this.openSignInModal}>Sign In</Button>
            )}
          </li>
        </ul>
        {this.state.isSignInModalShown && (
          <Modal padded onRequestClose={this.closeSignInModal}>
            <SignInForm onSuccess={this.handleSignInSuccess} />
          </Modal>
        )}
      </nav>
    );
  }
}

export default styled(Nav)`
  li {
    display: inline-block;
    vertical-align: middle;

    & + li {
      margin-left: 4px;
    }
  }

  a {
    padding: 8px 16px;
    border-radius: 5px;

    &:hover,
    &.-actived {
      color: ${colors.grey800};
      background: ${colors.grey100};
    }
  }
`;
