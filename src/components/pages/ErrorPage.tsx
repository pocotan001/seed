import { inject } from "mobx-react";
import * as React from "react";
import Page from "~/components/layouts/Page";
import { Button, Heading, Paragraph, Section } from "~/components/ui";
import config from "~/config";
import { RootStore } from "~/store";

interface IErrorPageProps {
  error: Error;
  store?: RootStore;
}

interface IErrorInfo {
  message: string;
  isRetryable?: boolean;
}

@inject("store")
export default class ErrorPage extends React.PureComponent<IErrorPageProps> {
  store = this.props.store!;

  reload = () => {
    this.store.history.replace(this.store.state.history.location.pathname);
  };

  getErrorInfo(): IErrorInfo {
    const { error } = this.props;

    if (config.isClient && !window.navigator.onLine) {
      return {
        message:
          "Looks like you have an unstable network at the moment, please try again when network stabilizes.",
        isRetryable: true
      };
    }

    switch (error.status) {
      case 404:
        return {
          message: "The requested page cannot be found."
        };
      case 408:
        return {
          message:
            "Looks like the server is taking to long to respond, please try again in sometime.",
          isRetryable: true
        };
      case 503:
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
      <Page>
        <Section>
          <Heading mb={24}>Error</Heading>
          <Paragraph>{message}</Paragraph>
          {isRetryable && (
            <Paragraph mt={16}>
              <Button onClick={this.reload}>Retry</Button>
            </Paragraph>
          )}
        </Section>
      </Page>
    );
  }
}
