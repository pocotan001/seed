import styled from "styled-components";
import { Color } from "~/components/styles/theme";

const Placeholder = styled.option.attrs({
  value: "",
  disabled: true
})`
  color: ${Color.Grey400};
`;

export default Placeholder;
