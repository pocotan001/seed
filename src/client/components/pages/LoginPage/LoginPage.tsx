import React from "react";
import { Helmet } from "react-helmet";
import DefaultLayout from "../../layouts/DefaultLayout";
import LoginForm, { LoginFormSubmitHandler } from "../../modules/LoginForm";
import Aligner from "../../ui/Aligner";

interface LoginPageProps {
  onSubmit: LoginFormSubmitHandler;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSubmit }) => (
  <DefaultLayout>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <Aligner height="100%" justify="center" align="center">
      <LoginForm onSubmit={onSubmit} />
    </Aligner>
  </DefaultLayout>
);

export default LoginPage;
