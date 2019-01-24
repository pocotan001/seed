import React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Redirect } from "react-router";
import createAuthGetters from "../../../state/auth/AuthGetters";
import { State } from "../../../state/State";
import { RouteComponentProps } from "../../routing/RouteComponent";
import DashboardPage from "./DashboardPage";

interface StateProps {
  isLoggedIn: boolean;
}

type OwnProps = RouteComponentProps;

type ConnectedDashboardPageProps = StateProps & OwnProps;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state => {
  const auth = createAuthGetters(state.auth);

  return {
    isLoggedIn: auth.isLoggedIn
  };
};

const ConnectedDashboardPage: React.FC<ConnectedDashboardPageProps> = ({
  isLoggedIn,
  operations
}) => {
  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <DashboardPage logout={operations.auth.logout} />;
};

export default connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  ConnectedDashboardPage
);
