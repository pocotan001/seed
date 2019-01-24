import styled from "styled-components";
import margin, { MarginProps } from "../styles/extends/margin";

type SpaceProps = MarginProps;

const Space = styled("div")<SpaceProps>`
  ${margin};
`;

export default Space;
