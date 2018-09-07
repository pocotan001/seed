import styled from "styled-components";
import { Color } from "~/components/styles/theme";

interface ContentProps {
  padded?: boolean;
  actived?: boolean;
}

const Content = styled<ContentProps, "div">("div")`
  position: relative;
  overflow: auto;
  width: 640px;
  ${({ padded }) => padded && "padding: 24px"};
  max-width: calc(100% - 48px);
  max-height: calc(100% - 48px);
  background: ${Color.White};
  border-radius: 5px;
  opacity: ${({ actived }) => (actived ? "1" : "0")};
  transform: ${({ actived }) => `scale(${actived ? "1" : "0.85"})`};
  transition: opacity 0.2s, transform 0.2s;
  -webkit-overflow-scrolling: touch;
`;

export default Content;
