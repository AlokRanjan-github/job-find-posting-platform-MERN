import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { login, logout, register, updateprofile } from '../controllers/user.controller.js';
import { singleUpload } from '../middleware/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").post(logout)
router.route("/profile/update").post(authenticateToken,singleUpload,updateprofile);

export default router;