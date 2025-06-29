import express from 'express';
import { login, register, updateProfile } from '../controllers/user.controller.js';

const router = express.router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateProfile").post(authenticateToken,updateProfile);

export default router;