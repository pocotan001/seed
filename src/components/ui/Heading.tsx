import Text from "./Text";

const Heading = Text.withComponent("h1").extend`
  line-height: normal;
`;

Heading.defaultProps = {
  fz: "2rem",
  fw: 700,
  c: "Grey800"
};

export default Heading;
