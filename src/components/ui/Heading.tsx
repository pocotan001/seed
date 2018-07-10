import Text from "./Text";

const Heading = Text.withComponent("h1").extend`
  line-height: normal;
`;

Heading.defaultProps = {
  fz: "2rem",
  fw: 500,
  c: "grey800"
};

export default Heading;
