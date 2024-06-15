import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
} from "express";

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
