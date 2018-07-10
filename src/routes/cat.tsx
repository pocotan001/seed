import * as React from "react";
import { IRouteAction } from "~/infrastructure/router";

const TITLE = "Cat";
const CATS_PER_PAGE = 10;

const cat: IRouteAction<{ page: string }> = (params, { store }) => {
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

      return {
        chunks: ["cat"],
        component: (
          <CatPage title={TITLE} params={params} catsPerPage={CATS_PER_PAGE} />
        ),
        title: TITLE,
        meta: [{ name: "description", content: "cat description" }]
      };
    }
  };
};

export default cat;
