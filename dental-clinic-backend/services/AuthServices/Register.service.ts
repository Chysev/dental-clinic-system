import path from "path";
import Jimp from "jimp";
import bcrypt from "bcrypt";
import { Request, Response } from "../../types/express-types";

import prisma from "../../prisma";
import { Register } from "../../types";

const RegisterService = async (req: Request, res: Response) => {
  const { email, name, password } = req.body as Register;
  let avatarUrl: string | undefined;

  const initial = name.charAt(0).toUpperCase();
  const image = await Jimp.create(200, 200, "#121212");
  const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);

  image.print(
    font,
    0,
    0,
    {
      text: initial,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    200,
    200
  );

  const uniqueFilename = Date.now() + "-default.png";
  const uploadPath = path.join(process.cwd(), "uploads", uniqueFilename);

  await image.writeAsync(uploadPath);
  avatarUrl = `${process.env.BACKEND_BASE_URL}/uploads/${uniqueFilename}`;

  const user = await prisma.account.findUnique({
    where: { email: email },
    include: { user: true },
  });

  if (!user) {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.account.create({
      data: {
        email: email,
        password: hashedPassword,
        user: {
          create: {
            name: name,
            avatarUrl: avatarUrl,
          },
        },
      },
    });
    return res.status(201).send("Account Created");
  } else {
    return res.status(409).send("Account already exists");
  }
};

export default RegisterService;
