import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const DeleteAppointmentService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = await prisma.appointment.findUnique({
    where: { id: Number(id) },
  });

  if (!appointment) {
    return res.status(404).send({ message: "Appointment not found" });
  }

  await prisma.appointment.delete({
    where: { id: Number(id) },
  });
};

export default DeleteAppointmentService;
