import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";
import { Grid, GridCell } from "~/components/ui/Grid";
import Heading from "~/components/ui/Heading";
import Image from "~/components/ui/Image";
import Paragraph from "~/components/ui/Paragraph";
import { ICat } from "~/domain/entities";

interface ICatCardProps {
  cat: ICat;
  className?: string;
}

const CatCard: React.SFC<ICatCardProps> = ({ cat, className }) => (
  <section className={className}>
    <Grid cols="auto 1fr" gap={16}>
      <GridCell>
        <Image src={cat.imageUrl} width={100} height={100} alt={cat.title} />
      </GridCell>
      <GridCell>
        <Heading fz={20} mb={4}>
          {cat.title}
        </Heading>
        <Paragraph>{cat.text}</Paragraph>
      </GridCell>
    </Grid>
  </section>
);

export default styled(CatCard)`
  padding: 16px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.grey200};
`;
