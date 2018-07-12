import { RequestHandler } from "express-serve-static-core";
import { normalize } from "normalizr";
import { IApiResponse } from "~/domain/Api";
import catSchema from "~/domain/catSchema";

export const getCats: RequestHandler = async (req, res, next) => {
  const service = req.ctx.service!;
  let page = Number(req.query.page);
  let per = Number(req.query.per);

  if (isNaN(page)) {
    page = 0;
  }

  if (isNaN(per)) {
    per = 5;
  }

  try {
    const cats = await service.cat.getCats({ page, per });
    const resp: IApiResponse = normalize(cats, [catSchema]);

    res.header("X-Total-Count", String(service.cat.totalCount));
    res.json(resp);
  } catch (err) {
    next(err);
  }
};
