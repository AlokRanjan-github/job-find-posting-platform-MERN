import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  saveJob,
  getSavedJobs,
} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get(authenticateToken, getAllJobs);
router.route("/get/:id").get(authenticateToken, getJobById);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/saved/:id").get(authenticateToken, saveJob);
router.route("/savedjobs").get(authenticateToken, getSavedJobs);

export default router;