import { RequestHandler } from "express-serve-static-core";

export const signIn: RequestHandler = async (req, res, next) => {
  const service = req.ctx.service!;
  const { email, password } = req.body;

  try {
    req.session.token = await service.auth.getToken({
      email,
      password
    });

    const me = await service.auth.getMe();

    req.session.me = me;
    res.json({ me });
  } catch (err) {
    next(err);
  }
};

export const signOut: RequestHandler = (req, res) => {
  delete req.session.token;
  delete req.session.me;
  res.json({});
};
