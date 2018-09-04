import * as React from "react";
import styled from "styled-components";
import { Color } from "~/components/styles/theme";
import { Grid, Heading, Image, Paragraph } from "~/components/ui";
import { ICat } from "~/domain/Cat";

interface ICatCardProps {
  cat: ICat;
  className?: string;
}

const CatCard: React.SFC<ICatCardProps> = ({ cat, className }) => (
  <section className={className}>
    <Grid cols="auto 1fr" gap={16}>
      <Grid.Cell>
        <Image src={cat.imageUrl} width={100} height={100} alt={cat.title} />
      </Grid.Cell>
      <Grid.Cell>
        <Heading fz={20} mb={4}>
          {cat.title}
        </Heading>
        <Paragraph>{cat.text}</Paragraph>
      </Grid.Cell>
    </Grid>
  </section>
);

export default styled(CatCard)`
  padding: 16px;
  border-radius: 5px;
  background: ${Color.grey200};
`;
