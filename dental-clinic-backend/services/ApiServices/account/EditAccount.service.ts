import { Request, Response } from "../../../types/express-types";
import prisma from "../../../prisma";

const EditAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, contact, role } = req.body;
  const existingDentist = await prisma.account.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });

  if (!existingDentist) {
    return res.status(404).send("Account not found");
  }

  if (email) {
    const emailUsedByAnother = await prisma.account.findUnique({
      where: { email: email },
    });

    if (emailUsedByAnother && emailUsedByAnother.id !== Number(id)) {
      return res
        .status(409)
        .send({ message: "Email is used by another account" });
    }
  }

  await prisma.account.update({
    where: { id: Number(id) },
    data: {
      email: email || existingDentist.email,
      contact: contact || existingDentist.contact,
      user: {
        update: {
          role: role || existingDentist.user?.role,
          name: name || existingDentist.user?.name,
        },
      },
    },
  });

  res.status(200).send({ message: "Account Updated Successfully" });
};

export default EditAccount;
