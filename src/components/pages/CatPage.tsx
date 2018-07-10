import { inject, observer } from "mobx-react";
import * as React from "react";
import Page from "~/components/layouts/Page";
import CatCard from "~/components/modules/CatCard";
import { Grid, GridCell } from "~/components/ui/Grid";
import Heading from "~/components/ui/Heading";
import Pagination from "~/components/ui/Pagination";
import { RootStore } from "~/store";

interface ICatPageProps {
  title: string;
  params: { page: string };
  catsPerPage: number;
}

const buildHref = (page: number) => `/cat/${page}`;

@inject("store")
@observer
export default class CatPage extends React.Component<ICatPageProps> {
  store: RootStore = (this.props as any).store;

  render() {
    const { title } = this.props;
    const page = Number(this.props.params.page);
    const per = this.props.catsPerPage;
    const cats = this.store.cat.getCatsByResult({ page, per });

    return (
      <Page>
        <Heading mb={24}>{title}</Heading>
        <Grid cols="repeat(auto-fit, minmax(20em, 1fr))" mb={24}>
          {cats.map(cat => (
            <GridCell key={cat.id}>
              <CatCard cat={cat} />
            </GridCell>
          ))}
        </Grid>
        <Pagination
          total={this.store.state.cats.totalCount}
          per={per}
          href={buildHref}
        />
      </Page>
    );
  }
}
