import { inject } from "mobx-react";
import * as React from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import { Button, Heading, Paragraph, Section } from "~/components/ui";
import { ErrorCode } from "~/domain/Error";
import { RootStore } from "~/store";

interface ErrorPageProps {
  error: Error;
  store?: RootStore;
}

interface ErrorInfo {
  message: string;
  isRetryable?: boolean;
}

@inject("store")
export default class ErrorPage extends React.PureComponent<ErrorPageProps> {
  store = this.props.store!;

  reload = () => {
    this.store.history.replace(this.store.state.history.location.pathname);
  };

  getErrorInfo(): ErrorInfo {
    const { error } = this.props;

    switch (error.code) {
      case ErrorCode.NotFound:
        return {
          message: "The requested page cannot be found."
        };
      case ErrorCode.TimedOut:
        return {
          message:
            "Looks like the server is taking to long to respond, please try again in sometime.",
          isRetryable: true
        };
      case ErrorCode.NotConnectedToInternet:
        return {
          message:
            "Looks like you have an unstable network at the moment, please try again when network stabilizes.",
          isRetryable: true
        };
      case ErrorCode.UnderMaintenance:
        return {
          message: "Sorry, we're down for maintenance."
        };
      default:
        return {
          message: "An error occurred, please try again later."
        };
    }
  }

  render() {
    const { message, isRetryable } = this.getErrorInfo();

    return (
      <DefaultLayout>
        <Section>
          <Heading mb={24}>Error</Heading>
          <Paragraph>{message}</Paragraph>
          {isRetryable && (
            <Paragraph mt={16}>
              <Button onClick={this.reload}>Retry</Button>
            </Paragraph>
          )}
        </Section>
      </DefaultLayout>
    );
  }
}
