import { inject, observer } from "mobx-react";
import * as React from "react";
import DefaultLayout from "~/components/layouts/DefaultLayout";
import { CatCard } from "~/components/modules";
import { Grid, Heading, Pagination } from "~/components/ui";
import { BreadcrumbItem } from "~/domain/Document";
import { RootStore } from "~/store";

interface CatPageProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  params: { page: string };
  catsPerPage: number;
}

const buildHref = (page: number) => `/cat/${page}`;

@inject("store")
@observer
export default class CatPage extends React.Component<CatPageProps> {
  store: RootStore = (this.props as any).store;

  render() {
    const { title, breadcrumb } = this.props;
    const page = Number(this.props.params.page);
    const per = this.props.catsPerPage;
    const cats = this.store.cat.getCatsByResult({ page, per });

    return (
      <DefaultLayout breadcrumb={breadcrumb}>
        <Heading mb={24}>{title}</Heading>
        <Grid cols="repeat(auto-fit, minmax(20em, 1fr))" mb={24}>
          {cats.map(cat => (
            <Grid.Cell key={cat.id}>
              <CatCard cat={cat} />
            </Grid.Cell>
          ))}
        </Grid>
        <Pagination
          total={this.store.state.cats.totalCount}
          per={per}
          href={buildHref}
        />
      </DefaultLayout>
    );
  }
}
