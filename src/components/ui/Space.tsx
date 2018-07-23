import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";

interface ISpaceProps extends IMarginProps {
  children: React.ReactNode;
}

const Space = styled<ISpaceProps, "div">("div")`
  ${margin};
`;

export default Space;
