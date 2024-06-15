import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const DeleteServiceService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = await prisma.service.findUnique({
    where: { id: Number(id) },
  });

  if (!appointment) {
    return res.status(404).send({ message: "Service not found" });
  }

  await prisma.service.delete({
    where: { id: Number(id) },
  });
};

export default DeleteServiceService;
