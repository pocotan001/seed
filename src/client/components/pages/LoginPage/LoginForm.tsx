import React from "react";
import {
  Field,
  FormErrors,
  FormSubmitHandler,
  InjectedFormProps,
  reduxForm
} from "redux-form";
import styled from "styled-components";
import { isEmail, isRequired } from "../../../../lib/Validators";
import Aligner from "../../ui/Aligner";
import Button from "../../ui/Button";
import TextField from "../../ui/TextField";

interface FormData {
  email?: string;
  password?: string;
}

export type LoginFormSubmitHandler = FormSubmitHandler<
  FormData,
  InjectedFormProps<FormData>
>;

interface OwnProps {
  className?: string;
  onSubmit?: LoginFormSubmitHandler;
}

type LoginFormProps = OwnProps & InjectedFormProps<FormData, OwnProps>;

const FORM_NAME = "login";

const validate = (values: FormData): FormErrors<FormData> => {
  const errors: FormErrors<FormData> = {};

  if (!isRequired(values.email)) {
    errors.email = "Required";
  } else if (!isEmail(values.email)) {
    errors.email = "Must be a valid email";
  }

  if (!isRequired(values.password)) {
    errors.password = "Required";
  }

  return errors;
};

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  pristine,
  submitting,
  // error,
  className
}) => (
  <form className={className} onSubmit={handleSubmit} noValidate>
    <Field
      id="email"
      name="email"
      label="Email"
      autoComplete="email"
      component={TextField}
      required
      mb={24}
    />
    <Field
      id="password"
      name="password"
      type="password"
      label="Password"
      autoComplete="current-password"
      component={TextField}
      required
      mb={24}
    />
    <Aligner justify="center">
      <Button type="submit" disabled={pristine || submitting}>
        Login
      </Button>
    </Aligner>
    {/* {error && <p>{error}</p>} */}
  </form>
);

const StyledLoginForm = styled(LoginForm)`
  width: 100%;
  max-width: 20em;
`;

export default reduxForm<FormData, OwnProps>({ validate, form: FORM_NAME })(
  StyledLoginForm
);
