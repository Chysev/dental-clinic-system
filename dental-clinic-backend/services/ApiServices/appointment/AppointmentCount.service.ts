import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const AppointmentCountService = async (req: Request, res: Response) => {
  const appointment = await prisma.appointment.count();
  return appointment;
};

export default AppointmentCountService;
