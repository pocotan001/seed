import { STATUS_CODES } from "http";
import React from "react";
import { Helmet } from "react-helmet";
import { ErrorCode } from "../../../entities/Errors";
import DefaultLayout from "../layouts/DefaultLayout";
import Button from "../ui/Button";
import Text from "../ui/Text";

interface ErrorPageProps {
  code: ErrorCode;
  status: number;
  retry?: () => void;
}

const getMessage = (code?: ErrorCode): string => {
  switch (code) {
    case ErrorCode.NotFound:
      return "The requested page cannot be found.";
    case ErrorCode.TimedOut:
      return "Looks like the server is taking to long to respond, please try again in sometime.";
    case ErrorCode.NotConnectedToInternet:
      return "Looks like you have an unstable network at the moment, please try again when network stabilizes.";
    case ErrorCode.UnderMaintenance:
      return "Sorry, we're down for maintenance.";
    default:
      return "An error occurred, please try again later.";
  }
};

const ErrorPage: React.FC<ErrorPageProps> = ({ code, status, retry }) => {
  const message = getMessage(code);

  return (
    <DefaultLayout>
      <Helmet>
        <title>{STATUS_CODES[status]}</title>
        <meta name="render:status_code" content={String(status)} />
      </Helmet>
      <Text as="h1">Error</Text>
      <Text as="p">{message}</Text>
      {retry && <Button onClick={retry}>Retry</Button>}
    </DefaultLayout>
  );
};

export default ErrorPage;
