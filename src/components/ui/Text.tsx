import styled from "styled-components";
import withColor, { ColorProps } from "~/components/styles/extends/withColor";
import withFont, { FontProps } from "~/components/styles/extends/withFont";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";

interface TextProps extends ColorProps, FontProps, MarginProps {
  children: React.ReactNode;
}

const Text = styled<TextProps, "span">("span")`
  ${withFont};
  ${withColor};
  ${withMargin};
`;

export default Text;
