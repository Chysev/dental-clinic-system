import { Request, Response } from "../types/express-types";

const asyncHandler = (fn: Function) => {
  return async (req: Request, res: Response, next: Function) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  };
};

export default asyncHandler;
