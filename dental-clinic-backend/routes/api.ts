import { Router } from "express";

import upload from "../lib/multer";
import isAdmin from "../middleware/isAdmin";
import apiController from "../controllers/apiController";
import isAuthenticated from "../middleware/isAuthenticated";

const router: Router = Router();

/**
 * Get session token.
 * @route GET /session
 * @group Authentication - Operations for user authentication
 * @returns {object} 200 - Session token
 * @returns {object} 404 - User not found
 */
router.get("/session", isAuthenticated, apiController.Token);

/**
 * Get admin session token.
 * @route GET /admin-session
 * @group Authentication - Operations for user authentication
 * @returns {object} 200 - Admin session token
 * @returns {object} 404 - User not found
 */
router.get("/admin-session", isAdmin, apiController.AdminToken);

/**
 * Get user list.
 * @route GET /user-list
 * @group User - Operations related to users
 * @returns {object[]} 200 - List of users
 */
router.get("/user-list", isAuthenticated, apiController.UserList);

/**
 * Get user dentist list.
 * @route GET /user-list/dentists
 * @group User - Operations related to users
 * @returns {object[]} 200 - List of dentists
 */
router.get("/user-list/dentists", isAuthenticated, apiController.DentistList);

/**
 * Get user staff list.
 * @route GET /user-list/staffs
 * @group User - Operations related to users
 * @returns {object[]} 200 - List of staff
 */
router.get("/user-list/staffs", isAuthenticated, apiController.StaffList);

/**
 * Get user patient list.
 * @route GET /user-list/patients
 * @group User - Operations related to users
 * @returns {object[]} 200 - List of patients
 */
router.get(
  "/user-list/patients",
  isAuthenticated,
  apiController.PatientListService
);

/**
 * Get appointment list.
 * @route GET /appointments
 * @group Appointment - Operations related to appointments
 * @returns {object[]} 200 - List of appointments
 */
router.get(
  "/appointments",
  isAuthenticated,
  apiController.AppointmentListService
);

/**
 * Get appointment count.
 * @route GET /appointments/count
 * @group Appointment - Operations related to appointments
 * @returns {object} 200 - Appointment count
 */
router.get(
  "/appointments/count",
  isAuthenticated,
  apiController.AppointmentCountService
);

/**
 * Get services list.
 * @route GET /services
 * @group Service - Operations related to services
 * @returns {object[]} 200 - List of services
 */
router.get("/services", isAuthenticated, apiController.ServiceListService);

/**
 * Delete account.
 * @route DELETE /delete-account
 * @group Account - Operations related to user accounts
 * @returns {string} 404 - Account not found
 */
router.delete(
  "/delete-account",
  isAuthenticated,
  apiController.DeleteOwnAccount
);

/**
 * Delete account by ID.
 * @route DELETE /delete-account/:id
 * @group Account - Operations related to user accounts
 * @returns {string} 404 - Account not found
 */
router.delete(
  "/delete-account/:id",
  isAuthenticated,
  apiController.DeleteAccount
);

/**
 * Delete service.
 * @route DELETE /delete-service/:id
 * @group Service - Operations related to services
 * @returns {string} 404 - Service not found
 */
router.delete(
  "/delete-service/:id",
  isAuthenticated,
  apiController.DeleteServiceService
);

/**
 * Delete appointment.
 * @route DELETE /delete-appointment/:id
 * @group Appointment - Operations related to appointments
 * @returns {string} 404 - Appointment not found
 */
router.delete(
  "/delete-appointment/:id",
  isAuthenticated,
  apiController.DeleteAppointment
);

/**
 * Edit account by ID.
 * @route PUT /edit-account/:id
 * @group Account - Operations related to user accounts
 * @param {string} name.body.required - New name
 * @param {string} email.body.required - New email address
 * @param {string} contact.body.required - New contact information
 * @param {string} role.body.required - New role
 * @returns {string} 400 - Missing required fields
 */
router.put("/edit-account/:id", isAuthenticated, apiController.EditAccount);

/**
 * Edit own account.
 * @route PUT /edit-own-account/:id
 * @group Account - Operations related to user accounts
 * @param {string} name.body.required - New name
 * @param {string} email.body.required - New email address
 * @param {string} contact.body.required - New contact information
 * @param {string} role.body.required - New role
 * @returns {string} 400 - Missing required fields
 */
router.put(
  "/edit-own-account/:id",
  upload.single("avatarUrl"),
  isAuthenticated,
  apiController.EditOwnAccount
);

/**
 * Edit service.
 * @route PUT /edit-service/:id
 * @group Service - Operations related to services
 * @param {string} name.body.required - New name
 * @param {string} price.body.required - New price
 * @returns {string} 400 - Missing required fields
 */
router.put(
  "/edit-service/:id",
  isAuthenticated,
  apiController.EditServiceService
);

/**
 * Create new appointment.
 * @route POST /appointment/create
 * @group Appointment - Operations related to appointments
 * @param {number} dentistId.body.required - Id of the dentist
 * @param {string} status.body.required - Status of the appointment
 * @param {string} date.body.required - Date of the appointment
 * @param {string} time.body.required - Time of the appointment
 * @param {Array<number>} serviceIds.body.required - Array of service IDs for the appointment
 * @returns {object} 200 - Appointment successfully created
 * @returns {object} 404 - User or Dentist not found
 */
router.post(
  "/appointment/create",
  isAuthenticated,
  apiController.CreateAppointment
);

/**
 * Create new service.
 * @route POST /service/create
 * @group Service - Operations related to services
 * @param {string} name.body.required - Name of the service
 * @param {number} price.body.required - Price of the service
 * @returns {object} 200 - Service successfully created
 * @returns {object} 404 - Service not found
 */
router.post(
  "/service/create",
  isAuthenticated,
  apiController.CreateServicesService
);

export default router;
