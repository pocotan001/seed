import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Color } from "~/components/styles/theme";

interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    MarginProps {
  children: React.ReactNode;
}

const ErrorMessage = styled<ErrorMessageProps, "p">("p").attrs({
  role: "alert"
})`
  color: ${Color.Pink800};
  white-space: pre;
  ${withMargin};
`;

export default ErrorMessage;
