type User = {
  avatarUrl: string;
  name: string;
  role: string;
};

type Service = {
  id: number;
  name: string;
  price: number;
};

type Dentist = {
  id: number;
  user: {
    name: string;
  };
  role: string;
  avatarUrl: string;
};

type Appointment = {
  id: number;
  userId: number;
  dentistId: number;
  date: string;
  time: string;
  status: string;
  archived: boolean;
  user: User;
  dentist: {
    name: string;
  };
  services: Service[];
};

type Token = {
  createdAt: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  updatedAt: string;
  user: User;
};

type Form = {
  userId: number;
  dentistId: string;
  status: string;
  serviceIds: number[];
  date: string;
  time: string;
};

type Service = {
  id: number;
  name: string;
};

type DentistCalendar = {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
};

type ServiceCalendar = {
  id: number;
  name: string;
  price: number;
};

type UserAppt = {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
};

type AppointmentCalendar = {
  id: number;
  userId: number;
  dentistId: number;
  date: string;
  status: string;
  archived: boolean;
  user: UserAppt;
  dentist: DentistCalendar;
  services: ServiceCalendar[];
};
