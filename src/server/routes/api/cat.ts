import { RequestHandler } from "express-serve-static-core";
import { normalize } from "normalizr";
import { catSchema } from "~/domain/Cat";

export const getCats: RequestHandler = async (req, res, next) => {
  let page = Number(req.query.page);
  let per = Number(req.query.per);

  if (isNaN(page)) {
    page = 0;
  }

  if (isNaN(per)) {
    per = 5;
  }

  try {
    const cats = await req.service.cat.getCats({ page, per });
    const normalized = normalize(cats, [catSchema]);

    const resp = {
      ...normalized,
      meta: {
        totalCount: req.service.cat.totalCount
      }
    };

    res.json(resp);
  } catch (err) {
    next(err);
  }
};
