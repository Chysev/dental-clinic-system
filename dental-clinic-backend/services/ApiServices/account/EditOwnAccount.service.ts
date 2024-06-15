import fs from "fs";
import path from "path";
import bcrypt, { genSalt } from "bcrypt";
import { Request, Response } from "express";

import prisma from "../../../prisma";

const EditOwnAccount = async (req: Request, res: Response) => {
  const authUser: any = req.user;
  const { name, email, contact, role, oldPassword, newPassword } = req.body;
  const file = req.file;
  let avatarUrl: string | undefined;

  const existingDentist = await prisma.account.findUnique({
    where: { id: Number(authUser.id) },
    include: { user: true },
  });

  if (!existingDentist) {
    return res.status(404).send("Account not found");
  }

  if (email) {
    const emailUsedByAnother = await prisma.account.findUnique({
      where: { email: email },
    });

    if (emailUsedByAnother && emailUsedByAnother.id !== Number(authUser.id)) {
      return res
        .status(409)
        .send({ message: "Email is used by another account" });
    }
  }

  if (file) {
    const uniqueFilename = Date.now() + "-" + file.originalname;
    const uploadPath = path.join(process.cwd(), "uploads", uniqueFilename);

    fs.writeFileSync(uploadPath, file.buffer);

    avatarUrl = `${process.env.BACKEND_BASE_URL}/uploads/${uniqueFilename}`;

    if (existingDentist.user?.avatarUrl) {
      const oldAvatarUrl = existingDentist.user.avatarUrl;
      const filename = oldAvatarUrl.substring(
        oldAvatarUrl.lastIndexOf("/") + 1
      );
      const oldImagePath = path.join(process.cwd(), "uploads", filename);

      try {
        fs.unlinkSync(oldImagePath);
        console.log(`Deleted old avatar image: ${oldImagePath}`);
      } catch (err) {
        console.error(`Error deleting old avatar image: ${err}`);
      }
    }
  }

  if (oldPassword && newPassword) {
    const oldPasswordMatch = await bcrypt.compare(
      oldPassword,
      existingDentist.password
    );

    if (!oldPasswordMatch) {
      return res.status(401).send({ message: "Old password is incorrect" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.account.update({
      where: { id: Number(authUser.id) },
      data: {
        email: email || existingDentist.email,
        contact: contact || existingDentist.contact,
        password: hashedPassword,
        user: {
          update: {
            role: role || existingDentist.user?.role,
            name: name || existingDentist.user?.name,
            avatarUrl: avatarUrl || existingDentist.user?.avatarUrl,
          },
        },
      },
    });
  } else {
    await prisma.account.update({
      where: { id: Number(authUser.id) },
      data: {
        email: email || existingDentist.email,
        contact: contact || existingDentist.contact,
        user: {
          update: {
            role: role || existingDentist.user?.role,
            name: name || existingDentist.user?.name,
            avatarUrl: avatarUrl || existingDentist.user?.avatarUrl,
          },
        },
      },
    });
  }

  res.status(200).send({ message: "Account Updated Successfully" });
};

export default EditOwnAccount;
