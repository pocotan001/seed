import { css } from "styled-components";

const normalize = css`
  ${preval`
    const fs = require("fs");
    module.exports = fs.readFileSync(require.resolve("normalize.css"), "utf8");
  `};
`;

export default normalize;
