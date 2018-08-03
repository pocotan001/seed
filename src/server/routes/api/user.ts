import { RequestHandler } from "express-serve-static-core";

export const signIn: RequestHandler = async (req, res, next) => {
  const service = req.ctx.service!;
  const { email, password } = req.body;

  try {
    req.session.accessToken = await service.user.getToken({
      email,
      password
    });

    const user = await service.user.getMe();
    const resp = {
      entities: { user },
      result: [user.id]
    };

    req.session.user = user;
    res.json(resp);
  } catch (err) {
    next(err);
  }
};

export const signOut: RequestHandler = (req, res) => {
  delete req.session.accessToken;
  delete req.session.user;
  res.json({});
};
