import * as React from "react";
import Page from "~/components/layouts/Page";
import Paragraph from "~/components/ui/Paragraph";

interface IErrorPageProps {
  error: Error;
}

const ErrorPage: React.SFC<IErrorPageProps> = ({ error }) => (
  <Page>
    <Paragraph>
      {error.status} {error.message}
    </Paragraph>
  </Page>
);

export default ErrorPage;
