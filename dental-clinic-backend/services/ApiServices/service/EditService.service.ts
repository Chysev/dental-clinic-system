import { Request, Response } from "../../../types/express-types";

import prisma from "../../../prisma";

const EditServiceService = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { name, price } = req.body;

  const existingService = await prisma.service.findUnique({
    where: { id: Number(id) },
  });

  if (!existingService) {
    return res.status(404).send({ message: "Service not found" });
  }

  const updatedService = await prisma.service.update({
    where: { id: Number(id) },
    data: {
      name: name || existingService.name,
      price: price || existingService.price,
    },
  });
  res.status(200).json(updatedService);
};

export default EditServiceService;
