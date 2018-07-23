import { inject, observer } from "mobx-react";
import * as React from "react";
import SignInForm from "~/components/modules/SignInForm";
import media from "~/components/styles/mixins/media";
import styled from "~/components/styles/themedStyledComponents";
import Button from "~/components/ui/Button";
import { Grid, GridCell } from "~/components/ui/Grid";
import Heading from "~/components/ui/Heading";
import Link from "~/components/ui/Link";
import Modal from "~/components/ui/Modal";
import NavLink from "~/components/ui/NavLink";
import config from "~/config";
import { RootStore } from "~/store";

interface IHeaderProps {
  className?: string;
}

interface IHeaderState {
  isSignInFormModalShown: boolean;
}

@inject("store")
@observer
class Header extends React.Component<IHeaderProps, IHeaderState> {
  store: RootStore = (this.props as any).store;

  state = {
    isSignInFormModalShown: false
  };

  signOut = () => {
    this.store.user.signOut();
  };

  openSignInFormModall = () => {
    this.setState({ isSignInFormModalShown: true });
  };

  closeSignInFormModal = () => {
    this.setState({ isSignInFormModalShown: false });
  };

  render() {
    const { className } = this.props;

    return (
      <header className={className}>
        <Grid cols="auto 1fr">
          <GridCell align="center">
            <Heading>
              <Link href="/">{config.siteName}</Link>
            </Heading>
          </GridCell>
          <GridCell justify="right" align="center">
            <nav className="nav">
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
                  <NavLink
                    href="/cat/1"
                    path="/cat/:page"
                    activeClassName="-actived"
                  >
                    Cat
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/404" activeClassName="-actived">
                    Not Found
                  </NavLink>
                </li>
                <li>
                  {this.store.user.isSignedIn ? (
                    <Button onClick={this.signOut}>Sign Out</Button>
                  ) : (
                    <Button onClick={this.openSignInFormModall}>Sign In</Button>
                  )}
                </li>
              </ul>
            </nav>
          </GridCell>
        </Grid>
        {this.state.isSignInFormModalShown && (
          <Modal padded onRequestClose={this.closeSignInFormModal}>
            <SignInForm onSuccess={this.closeSignInFormModal} />
          </Modal>
        )}
      </header>
    );
  }
}

export default styled(Header)`
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey200};
  background: ${({ theme }) => theme.colors.white};

  .nav {
    li {
      display: inline-block;

      & + li {
        vertical-align: middle;
        margin-left: 4px;
      }
    }

    a {
      padding: 8px 16px;
      border-radius: 5px;

      &:hover,
      &.-actived {
        color: ${({ theme }) => theme.colors.grey800};
        background: ${({ theme }) => theme.colors.grey100};
      }

      ${media.tablet`
        padding: 4px 12px;
      `};
    }
  }
`;
