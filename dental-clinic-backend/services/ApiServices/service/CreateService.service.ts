import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";
import { Services } from "../../../types";

const CreateServicesService = async (req: Request, res: Response) => {
  const { name, price } = req.body as Services;

  await prisma.service.create({
    data: {
      name: name,
      price: price,
    },
  });
};

export default CreateServicesService;
