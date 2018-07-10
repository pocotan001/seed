import { RequestHandler } from "express-serve-static-core";
import { IApiResponse } from "~/domain/entities";

export const login: RequestHandler = async (req, res, next) => {
  const service = req.ctx.service!;
  const { email, password } = req.body;

  try {
    req.session.accessToken = await service.user.getToken({
      email,
      password
    });

    const user = await service.user.getMe();
    const resp: IApiResponse = {
      entities: { user },
      result: [user.id]
    };

    req.session.user = user;
    res.json(resp);
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (req, res) => {
  delete req.session.accessToken;
  delete req.session.user;
  res.json({});
};
