import { Router } from "express";

import authController from "../controllers/authController";
import isAuthenticated from "../middleware/isAuthenticated";

const router: Router = Router();

/**
 * Register user.
 * @route POST /register
 * @group Authentication - Operations for user authentication
 * @param {string} email.formData.required - Email of the user
 * @param {string} name.formData.required - Name of the user
 * @param {string} password.formData.required - Password of the user
 * @returns {object} 200 - Account created
 */
router.post("/register", authController.Register);

/**
 * Log in user.
 * @route POST /login
 * @group Authentication - Operations for user authentication
 * @param {string} email.body.required - Email of the user
 * @param {string} password.body.required - Password of the user
 * @returns {object} 200 - Logged in successfully
 * @returns {object} 401 - Invalid credentials
 */
router.post("/login", authController.Login);

/**
 * Log out user.
 * @route GET /logout
 * @group Authentication - Operations for user authentication
 * @returns {string} 200 - Successfully Logged Out
 */
router.get("/logout", isAuthenticated, authController.Logout);

export default router;
