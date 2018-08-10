import styled from "~/components/styles/themedStyledComponents";

const Backdrop = styled.div.attrs({
  tabIndex: -1,
  role: "presentation"
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
