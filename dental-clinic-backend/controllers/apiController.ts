import { Request, Response } from "../types/express-types";

import asyncHandler from "./asyncHandler";
import TokenService from "../services/ApiServices/user/Token.service";
import UserListService from "../services/ApiServices/user/UserList.service";
import EditAccount from "../services/ApiServices/account/EditAccount.service";
import StaffListService from "../services/ApiServices/staff/StaffList.service";
import AdminTokenService from "../services/ApiServices/user/AdminToken.service";
import DeleteAccount from "../services/ApiServices/account/DeleteAccount.service";
import ServiceListService from "../services/ApiServices/service/ServiceList.service";
import EditServiceService from "../services/ApiServices/service/EditService.service";
import PatientListService from "../services/ApiServices/patient/PatientList.service";
import EditOwnAccount from "../services/ApiServices/account/EditOwnAccount.service";
import DentistListService from "../services/ApiServices/dentist/DentistList.service";
import DeleteServiceService from "../services/ApiServices/service/DeleteService.service";
import CreateServicesService from "../services/ApiServices/service/CreateService.service";
import DeleteOwnAccountService from "../services/ApiServices/account/DeleteOwnAccount.service";
import AppointmentListService from "../services/ApiServices/appointment/AppointmentList.service";
import AppointmentCountService from "../services/ApiServices/appointment/AppointmentCount.service";
import DeleteAppointmentService from "../services/ApiServices/appointment/DeleteAppointment.service";
import CreateAppointmentService from "../services/ApiServices/appointment/CreateAppointment.service";

const apiController = {
  Token: asyncHandler(async (req: Request, res: Response) => {
    await TokenService(req, res);
  }),

  AdminToken: asyncHandler(async (req: Request, res: Response) => {
    await AdminTokenService(req, res);
  }),

  UserList: asyncHandler(async (req: Request, res: Response) => {
    const account = await UserListService();
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).send({ message: "Account Not Found" });
    }
  }),

  DeleteOwnAccount: asyncHandler(async (req: Request, res: Response) => {
    await DeleteOwnAccountService(req, res);
    res.status(200).send({ message: "Account successfully closed" });
  }),

  DeleteAccount: asyncHandler(async (req: Request, res: Response) => {
    await DeleteAccount(req, res);
  }),

  DeleteServiceService: asyncHandler(async (req: Request, res: Response) => {
    await DeleteServiceService(req, res);
  }),

  EditAccount: asyncHandler(async (req: Request, res: Response) => {
    await EditAccount(req, res);
  }),

  EditOwnAccount: asyncHandler(async (req: Request, res: Response) => {
    await EditOwnAccount(req, res);
  }),

  EditServiceService: asyncHandler(async (req: Request, res: Response) => {
    await EditServiceService(req, res);
  }),

  CreateAppointment: asyncHandler(async (req: Request, res: Response) => {
    await CreateAppointmentService(req, res);
  }),

  CreateServicesService: asyncHandler(async (req: Request, res: Response) => {
    await CreateServicesService(req, res);
    res.status(200).send({ message: "Service created successfully" });
  }),

  DentistList: asyncHandler(async (req: Request, res: Response) => {
    const account = await DentistListService(req, res);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(400).send({ message: "Account not found" });
    }
  }),

  StaffList: asyncHandler(async (req: Request, res: Response) => {
    const account = await StaffListService(req, res);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(400).send({ message: "Account not found" });
    }
  }),

  PatientListService: asyncHandler(async (req: Request, res: Response) => {
    const account = await PatientListService(req, res);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(400).send({ message: "Account not found" });
    }
  }),

  AppointmentListService: asyncHandler(async (req: Request, res: Response) => {
    const appointment = await AppointmentListService(req, res);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(400).send({ message: "Account not found" });
    }
  }),
  AppointmentCountService: asyncHandler(async (req: Request, res: Response) => {
    const appointment = await AppointmentCountService(req, res);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(400).send({ message: "Account not found" });
    }
  }),

  ServiceListService: asyncHandler(async (req: Request, res: Response) => {
    const services = await ServiceListService(req, res);
    if (services) {
      res.status(200).json(services);
    } else {
      res.status(404).send({ message: "Service not found" });
    }
  }),
  DeleteAppointment: asyncHandler(async (req: Request, res: Response) => {
    await DeleteAppointmentService(req, res);
  }),
};

export default apiController;
