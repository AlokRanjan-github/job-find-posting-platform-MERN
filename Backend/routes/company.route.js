import express from 'express';
import authenticateToken from '../middleware/isAuthenticated.js';
import { register, getCompanyById, getAllCompanies, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router.route("/register").post(register);
router.route("/get").post(getAllCompanies);
router.route("/get/:id").post(getCompanyById);
router.route("/updateCompany").post(authenticateToken,updateCompany);

export default router;