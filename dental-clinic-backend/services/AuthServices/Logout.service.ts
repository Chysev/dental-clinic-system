import { Request, Response } from "../../types/express-types";

const LogoutService = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).send("Successfully Logged Out");
};

export default LogoutService;
