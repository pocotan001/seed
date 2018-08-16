import styled from "styled-components";
import color, { IColorProps } from "~/components/styles/extends/color";
import font, { IFontProps } from "~/components/styles/extends/font";
import margin, { IMarginProps } from "~/components/styles/extends/margin";

interface ITextProps extends IColorProps, IFontProps, IMarginProps {
  children: React.ReactNode;
}

const Text = styled<ITextProps, "span">("span")`
  ${font};
  ${color};
  ${margin};
`;

export default Text;
