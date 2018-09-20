import * as React from "react";
import config from "~/config";
import {
  BreadcrumbItem,
  createBasicMetadata,
  createBreadcrumbListAsJsonLd,
  createTitle
} from "~/domain/Document";
import { RouteAction } from "~/infra/router";

const CATS_PER_PAGE = 10;

const cat: RouteAction<{ page: string }> = (path, params, { store }) => {
  const page = Number(params.page);

  if (isNaN(page)) {
    return {
      render: () => ({
        redirect: "/cat/1"
      })
    };
  }

  return {
    components: () => [
      import(/* webpackChunkName: "cat" */ "../components/pages/CatPage")
    ],
    fetch: () => store.cat.fetchCats({ page, per: CATS_PER_PAGE }),
    render: CatPage => {
      const totalPages = store.state.cats.totalCount / CATS_PER_PAGE;

      if (page > totalPages) {
        return {
          redirect: "/cat/1"
        };
      }

      const title = `Cat ${page}`;
      const description = `cat ${page} description`;
      const breadcrumb: BreadcrumbItem[] = [{ title, path }];

      return {
        chunks: ["cat"],
        component: (
          <CatPage
            title={title}
            breadcrumb={breadcrumb}
            params={params}
            catsPerPage={CATS_PER_PAGE}
          />
        ),
        title: createTitle(title),
        meta: createBasicMetadata({ title, description, path }),
        link: [
          ...(page > 1
            ? [{ rel: "prev", href: `${config.origin}/cat/${page - 1}` }]
            : []),
          ...(page < totalPages
            ? [{ rel: "next", href: `${config.origin}/cat/${page + 1}` }]
            : [])
        ],
        jsonLd: [createBreadcrumbListAsJsonLd(breadcrumb)]
      };
    }
  };
};

export default cat;
