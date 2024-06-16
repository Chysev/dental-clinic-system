import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import nocache from "nocache";
import prisma from "./prisma";
import "./utils/envValidator";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "./types/express-types";

const app = express();

async function connectPrisma() {
  await prisma.$connect();
}
async function disconnectPrisma() {
  await prisma.$disconnect();
}

const imagePath = path.join(process.cwd(), "uploads");

app.get("/uploads/:imageName", (req, res) => {
  const { imageName } = req.params;
  res.sendFile(path.join(imagePath, imageName));
});

app.use(helmet());
app.use(nocache());
app.use(express.json());
app.use(morgan("dev"));
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.set("trust proxy", 1) // Uncomment if using http or using a provider

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

import apiRoutes from "./routes/api";
import authRoutes from "./routes/auth";

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  return res.render("index.ejs");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).send("Internal Server Error");
  return next();
});

connectPrisma()
  .then(() => {
    console.log("Prisma Connected");
    app.listen(process.env.BACKEND_PORT as string, () => {
      console.log(`Server is running: ${process.env.BACKEND_BASE_URL}`);
    });
  })
  .catch(async (e) => {
    console.log("Prisma connection failed:", e);
    await disconnectPrisma();
    process.exit(1);
  });
