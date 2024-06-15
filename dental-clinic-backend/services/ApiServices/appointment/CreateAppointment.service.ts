import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";
import { Appointment } from "../../../types";

const CreateAppointmentService = async (req: Request, res: Response) => {
  const { dentistId, status, date, time, serviceIds } = req.body as Appointment;

  const authUser: any = req.user;

  const user = await prisma.user.findUnique({
    where: { id: Number(authUser?.id), role: "MEMBER" },
  });
  const dentist = await prisma.user.findUnique({
    where: { id: Number(dentistId), role: "DENTIST" },
  });

  if (!user || !dentist) {
    return res.status(404).send({ message: "User or Dentist not found" });
  }
  const appointment = await prisma.appointment.create({
    data: {
      userId: Number(authUser?.id),
      dentistId: Number(dentistId),
      status: status,
      date: date,
      time: time,
      services: {
        connect: serviceIds.map((serviceId) => ({ id: serviceId })),
      },
    },
    include: {
      user: { select: { name: true } },
      dentist: { select: { name: true } },
      services: { select: { name: true } },
    },
  });

  return res.status(201).json({ appointment });
};

export default CreateAppointmentService;
