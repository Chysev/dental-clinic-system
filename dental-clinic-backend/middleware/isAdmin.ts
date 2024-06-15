import { User } from "../types";
import { Request, Response, NextFunction } from "../types/express-types";

import jwt from "jsonwebtoken";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .send({ message: "Missing access token and refresh token" });
  }

  try {
    const verifyAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = verifyAccessToken as User;

    if (req.user && req.user.role === "Admin") {
      return next();
    }
  } catch (accessTokenError) {
    if (!refreshToken) {
      return res.status(401).send({ message: "Refresh token missing" });
    }

    const verifyRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      verifyRefreshToken,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", newAccessToken, { httpOnly: true });

    req.user = verifyRefreshToken as User;

    if (req.user && req.user.role === "Admin") {
      return next();
    }
  }

  return res
    .status(403)
    .send({ message: "You are not authorized and admin to this page" });
};

export default isAdmin;
