import { inject, observer } from "mobx-react";
import * as React from "react";
import {
  Button,
  Form,
  Paragraph,
  Space,
  SubmitError,
  TextField,
  ValidationError
} from "~/components/ui";
import { ErrorCode } from "~/domain/Error";
import { isEmail, isRequired } from "~/domain/validators";
import { RootStore } from "~/store";
import { buildFormValidator, composeFormValidators } from "~/utils";

interface ISignInFormProps {
  onSuccess?: () => void;
}

interface IValues {
  email: string;
  password: string;
}

const required = buildFormValidator(isRequired, "Required");
const email = composeFormValidators(
  required,
  buildFormValidator(isEmail, "Must be a valid email")
);

@inject("store")
@observer
export default class SignInForm extends React.Component<ISignInFormProps> {
  store: RootStore = (this.props as any).store;

  handleSubmit = async (values: IValues): Promise<void | string> => {
    const { onSuccess } = this.props;

    try {
      await this.store.auth.signIn(values);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const message =
        err.code === ErrorCode.UNAUTHENTICATED
          ? "Login Failed"
          : "Internal Server Error";

      return message;
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Space mb={16}>
              <Paragraph mb={8}>
                <label htmlFor="email">Email (fake@example.com)</label>
              </Paragraph>
              <TextField
                id="email"
                name="email"
                autoComplete="email"
                placeholder="fake@example.com"
                validate={email}
                aria-required
              />
              <ValidationError name="email" mt={4} />
            </Space>

            <Space mb={24}>
              <Paragraph mb={8}>
                <label htmlFor="password">Password (xxxxx)</label>
              </Paragraph>
              <TextField
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="xxxxx"
                validate={required}
                aria-required
              />
              <ValidationError name="password" mt={4} />
            </Space>

            <SubmitError mb={24} />

            <div>
              <Button type="submit" disabled={submitting}>
                Submit
              </Button>
            </div>
          </form>
        )}
      </Form>
    );
  }
}
