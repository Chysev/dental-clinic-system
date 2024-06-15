import { Toaster } from "react-hot-toast";
import { createRoute, redirect } from "@tanstack/react-router";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Staffs from "../pages/Dashboard/Staffs";
import Dentist from "../pages/Dashboard/Dentist";
import Patient from "../pages/Dashboard/Patient";
import Invoices from "../pages/Dashboard/Invoices";
import Services from "../pages/Dashboard/Services";
import Dashboard from "../pages/Dashboard/Dashboard";
import TodaysAppt from "../pages/Dashboard/Todays_Appt";
import Appointment from "../pages/Dashboard/Appointment";
import UserList from "@/pages/Dashboard/UserList";

const queryClient = new QueryClient();

export const rootRoute = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",

  loader: () => {
    throw redirect({
      to: "/auth/login",
    });
  },
});

const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: Login,
});

const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/register",
  component: Register,
});

const DashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: Dashboard,
});

const DentistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dentist",
  component: Dentist,
});

const ServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});

const StaffsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/staffs",
  component: Staffs,
});

const PatientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patients",
  component: Patient,
});

const AppointmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/appointment",
  component: Appointment,
});

const TodaysApptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/active-appointment",
  component: TodaysAppt,
});

const InvoicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invoices",
  component: Invoices,
});

const UserListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/userlist",
  component: UserList,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  LoginRoute,
  RegisterRoute,
  DashboardRoute,
  DentistRoute,
  ServicesRoute,
  StaffsRoute,
  PatientRoute,
  AppointmentRoute,
  TodaysApptRoute,
  InvoicesRoute,
  UserListRoute,
]);

export default routeTree;
