import { Middleware } from "./Middleware";

const createRenderMiddleware = (publicPath: string): Middleware => (
  _,
  res,
  next
) => {
  // Prevent 304 response
  res.setHeader("Last-Modified", new Date().toUTCString());
  res.sendFile(`${publicPath}/index.html`, (err?: Error) => {
    if (err) {
      next(err);
    }
  });
};

export default createRenderMiddleware;
