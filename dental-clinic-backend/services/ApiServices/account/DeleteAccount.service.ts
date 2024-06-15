import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const DeleteDentistAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const DentistAccount = await prisma.account.findUnique({
    where: { id: Number(id) },
  });

  if (!DentistAccount) {
    res.status(404).send({ message: "Dentist not found" });
  }

  await prisma.account.delete({
    where: { id: Number(id) },
  });

  await prisma.user.delete({
    where: { id: Number(id) },
  });
};

export default DeleteDentistAccount;
