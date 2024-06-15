import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const StaffListService = async (req: Request, res: Response) => {
  const account = await prisma.account.findMany({
    where: { user: { role: "STAFF" } },
    include: { user: true },
  });

  return account;
};

export default StaffListService;
