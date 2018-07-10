import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";

interface ISectionProps extends IMarginProps {
  children: React.ReactNode;
}

const Section = styled<ISectionProps, "section">("section")`
  ${margin};
`;

export default Section;
