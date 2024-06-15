import { Request, Response } from "../../../types/express-types";

const TokenService = async (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(404).json({ message: "Account Not Found" });
  }
};

export default TokenService;
