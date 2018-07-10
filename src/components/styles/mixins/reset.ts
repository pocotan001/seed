import { css } from "~/components/styles/themedStyledComponents";

export const reset = css`
  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figure,
  p,
  pre {
    margin: 0;
  }

  button {
    background: transparent;
    border: 0;
    padding: 0;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }

  iframe {
    border: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  progress {
    appearance: none;
    background: transparent;
    border: none; /* for Firefox */

    &::-webkit-progress-bar {
      background: transparent;
    }

    &::-webkit-progress-value {
      background: transparent;
    }

    &::-moz-progress-bar {
      background: transparent;
    }
  }
`;

export default reset;
