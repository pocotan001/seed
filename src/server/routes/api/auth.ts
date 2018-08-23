import { RequestHandler } from "express-serve-static-core";

export const signIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    req.session.token = await req.service.auth.getToken({
      email,
      password
    });

    const me = await req.service.auth.getMe();

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
