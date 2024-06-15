import { ButtonHTMLAttributes, ReactNode, ChangeEvent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
}

type LoginState = {
  email: string;
  password: string;
};

type RegisterState = {
  user: {
    name: string;
    avatarUrl?: File | null;
  };
  email: string;
  password: string;
};

type UpdateState = {
  user: {
    name: string;
    avatarUrl?: File | null;
  };
  email: string;
  contact: string;
  oldPassword: string;
  newPassword: string;
};

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  value?: any;
  placeholder?: string;
  required?: boolean;
};

export type AppointmentT = {
  id?: number;
  userId: number;
  dentistId: number;
  date: string;
  time: string;
  status: string;
  services: {
    id: number;
    name: string;
  }[];
  user: {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
  };
  dentist: {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
  };
};

export type ServicesT = {
  id: number;
  name: string;
  price: number;
};

export type AccountT = {
  id: number;
  email: string;
  contact: string;
  user: {
    name: string;
    role: string;
  };
};

export type UserT = {
  id: number;
  email: string;
  contact: string;
  status: string;
  user: {
    id: number;
    name: string;
    role: string;
    avatarUrl: string;
  };
};

export type LogEntry = {
  status: string;
  time: string;
  comment: string;
};
