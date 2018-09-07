import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";

interface ArticleProps extends MarginProps {
  children: React.ReactNode;
}

const Article = styled<ArticleProps, "article">("article")`
  ${withMargin};
`;

export default Article;
