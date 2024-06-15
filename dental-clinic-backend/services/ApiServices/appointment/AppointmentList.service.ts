import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const AppointmentListService = async (req: Request, res: Response) => {
  const appointment = await prisma.appointment.findMany({
    include: { user: true, dentist: true, services: true },
  });

  return appointment;
};

export default AppointmentListService;
