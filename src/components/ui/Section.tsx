import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";

interface ISectionProps extends IMarginProps {
  children: React.ReactNode;
}

const Section = styled<ISectionProps, "section">("section")`
  ${margin};
`;

export default Section;
