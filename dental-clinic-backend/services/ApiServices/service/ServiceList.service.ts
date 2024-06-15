import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const ServiceListService = async (req: Request, res: Response) => {
  const services = await prisma.service.findMany();

  return services;
};

export default ServiceListService;
