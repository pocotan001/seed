import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect } from "react-router";
import { SubmissionError } from "redux-form";
import { LoginFormSubmitHandler } from "../../../components/modules/LoginForm";
import { State } from "../../../state";
import createAuthGetters from "../../../state/auth/AuthGetters";
import { RouteComponentProps } from "../../routing/RouteComponent";
import LoginPage from "./LoginPage";

interface StateProps {
  isLoggedIn: boolean;
}

type OwnProps = RouteComponentProps;

type ConnectedLoginPageProps = StateProps & OwnProps;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state => {
  const auth = createAuthGetters(state.auth);

  return {
    isLoggedIn: auth.isLoggedIn
  };
};

class ConnectedLoginPage extends React.Component<ConnectedLoginPageProps> {
  handleSubmit: LoginFormSubmitHandler = async values => {
    const { operations } = this.props;

    try {
      await operations.auth.login(values.email!, values.password!);
    } catch (err) {
      throw new SubmissionError({
        _error: err.message
      });
    }
  };

  render(): React.ReactNode {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return <LoginPage onSubmit={this.handleSubmit} />;
  }
}

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  ConnectedLoginPage
);
