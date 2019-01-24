import styled from "styled-components";
import { Color } from "../../styles/enums";

const InvalidMessage = styled("p").attrs({
  role: "alert"
})`
  font-size: 80%;
  color: ${Color.Pink500};
  white-space: pre;
  margin-top: 4px;
`;

export default InvalidMessage;
