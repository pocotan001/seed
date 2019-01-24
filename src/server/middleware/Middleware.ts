import { ErrorRequestHandler, RequestHandler } from "express";

export type Middleware = RequestHandler;
export type CatcherMiddleware = ErrorRequestHandler;
