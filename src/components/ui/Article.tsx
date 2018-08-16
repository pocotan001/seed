import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";

interface IArticleProps extends IMarginProps {
  children: React.ReactNode;
}

const Article = styled<IArticleProps, "article">("article")`
  ${margin};
`;

export default Article;
