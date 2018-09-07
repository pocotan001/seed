import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";

interface SpaceProps extends MarginProps {
  children: React.ReactNode;
}

const Space = styled<SpaceProps, "div">("div")`
  ${withMargin};
`;

export default Space;
