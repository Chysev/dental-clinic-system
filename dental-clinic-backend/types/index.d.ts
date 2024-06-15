import { Status } from "@prisma/client";

type User = {
  userId: number;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
};

type Register = {
  email: string;
  name: string;
  role: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

type Appointment = {
  userId: number;
  dentistId: number;
  status: Status;
  date: string;
  time: string;
  serviceIds: number[];
};

type Services = {
  name: string;
  price: number;
};
