import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";

interface ISpaceProps extends IMarginProps {
  children: React.ReactNode;
}

const Space = styled<ISpaceProps, "div">("div")`
  ${margin};
`;

export default Space;
