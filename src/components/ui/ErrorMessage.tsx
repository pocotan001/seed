import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { Color } from "~/components/styles/theme";

interface IErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    IMarginProps {
  children: React.ReactNode;
}

const ErrorMessage = styled<IErrorMessageProps, "p">("p").attrs({
  role: "alert"
})`
  color: ${Color.pink800};
  white-space: pre;
  ${margin};
`;

export default ErrorMessage;
