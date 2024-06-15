import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const PatientListService = async (req: Request, res: Response) => {
  const account = await prisma.account.findMany({
    where: { user: { role: "PATIENT" } },
    include: { user: true },
  });

  return account;
};

export default PatientListService;
