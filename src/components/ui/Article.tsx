import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";

interface IArticleProps extends IMarginProps {
  children: React.ReactNode;
}

const Article = styled<IArticleProps, "article">("article")`
  ${margin};
`;

export default Article;
