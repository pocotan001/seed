import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Color } from "~/components/styles/theme";

interface ContentProps extends MarginProps {
  children?: React.ReactNode;
}

const Content = styled<ContentProps, "div">("div")`
  > *:first-child {
    margin-top: 0 !important;
  }

  > *:last-child {
    margin-bottom: 0 !important;
  }

  blockquote,
  dl,
  ol,
  p,
  pre,
  table,
  ul {
    margin: 16px 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    line-height: normal;
    margin: 24px 0;
    color: ${Color.Grey800};
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  h6 {
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: ${Color.Pink300};

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    padding: 0 16px;
    border-left: 4px solid ${Color.Grey300};
  }

  hr {
    height: 4px;
    border: 0;
    background: ${Color.Grey300};
  }

  ol {
    margin-left: 2em;
    list-style: decimal outside;
  }

  ul {
    margin-left: 2em;
    list-style: disc outside;
  }

  ul ul {
    margin-top: 8px;
    list-style-type: circle;
  }

  li + li {
    margin-top: 8px;
  }

  li p {
    margin: 8px 0;
  }

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  code {
    margin: 0 4px;
    padding: 0 4px;
    white-space: nowrap;
    border: 1px solid ${Color.Grey300};
    border-radius: 3px;
    background: ${Color.Grey100};
  }

  pre {
    overflow: auto;
    padding: 16px;
    background: ${Color.Grey100};
    -webkit-overflow-scrolling: touch;
  }

  pre code {
    white-space: pre;
    border: 0;
    background: transparent;
    margin: 0;
  }

  table {
    width: 100%;
  }

  table td,
  table th {
    padding: 8px 12px;
    vertical-align: top;
    border: 1px solid ${Color.Grey300};
    border-width: 0 0 1px;
  }

  table th {
    font-weight: 700;
  }

  table thead td,
  table thead th {
    border-width: 0 0 2px;
  }

  table tfoot td,
  table tfoot th {
    border-width: 2px 0 0;
  }

  table tbody tr:last-child td,
  table tbody tr:last-child th {
    border-bottom-width: 0;
  }

  ${withMargin};
`;

export default Content;
