import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout)
router.route("/updateProfile").post(authenticateToken,updateProfile);

export default router;