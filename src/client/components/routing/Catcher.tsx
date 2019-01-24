import { HTTPError, TimeoutError } from "ky";
import React from "react";
import { ErrorCode, ErrorResponse } from "../../../entities/Errors";
import ErrorPage from "../pages/ErrorPage";

interface CatcherProps {
  children: React.ReactNode;
}

interface CatcherState {
  error: Error | HTTPError | TimeoutError | null;
  response?: ErrorResponse;
}

const retryCodes: ErrorCode[] = [ErrorCode.TimedOut, ErrorCode.Internal];

export default class Catcher extends React.Component<
  CatcherProps,
  CatcherState
> {
  state: CatcherState = {
    error: null
  };

  retry = (): void =>
    this.setState({
      error: null,
      response: undefined
    });

  get code(): ErrorCode {
    const { error, response } = this.state;

    if (response) {
      return response.code;
    }

    if (error instanceof TimeoutError) {
      return ErrorCode.TimedOut;
    }

    if (!navigator.onLine) {
      return ErrorCode.NotConnectedToInternet;
    }

    return ErrorCode.Internal;
  }

  get status(): number {
    const { error } = this.state;

    if (error instanceof HTTPError) {
      return error.response.status;
    }

    switch (this.code) {
      case ErrorCode.NotFound:
        return 404;
      case ErrorCode.TimedOut:
        return 408;
      case ErrorCode.Internal:
        return 500;
      case ErrorCode.UnderMaintenance:
        return 503;
      default:
        return 500;
    }
  }

  get isRetryAllowed(): boolean {
    return retryCodes.includes(this.code);
  }

  async componentDidCatch(
    err: Error | HTTPError | TimeoutError
  ): Promise<void> {
    let resp: ErrorResponse | undefined;

    if (err instanceof HTTPError) {
      resp = await err.response.json();
    }

    this.setState({
      error: err,
      response: resp
    });
  }

  render(): React.ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <ErrorPage
        code={this.code}
        status={this.status}
        retry={this.isRetryAllowed ? this.retry : undefined}
      />
    );
  }
}
