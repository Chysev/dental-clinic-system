import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const DentistListService = async (req: Request, res: Response) => {
  const account = await prisma.account.findMany({
    where: { user: { role: "DENTIST" } },
    include: { user: true },
  });

  return account;
};

export default DentistListService;
