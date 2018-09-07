import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";

interface SectionProps extends MarginProps {
  children: React.ReactNode;
}

const Section = styled<SectionProps, "section">("section")`
  ${withMargin};
`;

export default Section;
