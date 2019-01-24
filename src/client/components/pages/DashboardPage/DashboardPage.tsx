import React from "react";
import { Helmet } from "react-helmet";
import { AuthOperations } from "../../../state/auth/AuthOperations";
import DefaultLayout from "../../layouts/DefaultLayout";
import Aligner from "../../ui/Aligner";

interface DashboardPageProps {
  logout: AuthOperations["logout"];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ logout }) => (
  <DefaultLayout logout={logout}>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Aligner height="100%" justify="center" align="center">
      <p>Hello Dashboard</p>
    </Aligner>
  </DefaultLayout>
);

export default DashboardPage;
