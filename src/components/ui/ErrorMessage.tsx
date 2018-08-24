import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { colors } from "~/components/styles/theme";

interface IErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    IMarginProps {
  children: React.ReactNode;
}

const ErrorMessage = styled<IErrorMessageProps, "p">("p").attrs({
  role: "alert"
})`
  color: ${colors.pink800};
  white-space: pre;
  ${margin};
`;

export default ErrorMessage;
