import React from "react";
import { ErrorCode } from "../../../entities/Errors";
import ErrorPage from "./ErrorPage";

const NotFoundPage: React.FC = () => (
  <ErrorPage code={ErrorCode.NotFound} status={404} />
);

export default NotFoundPage;
