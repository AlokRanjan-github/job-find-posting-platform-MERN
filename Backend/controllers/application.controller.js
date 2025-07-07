import { application } from "express";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Invalid job ID", success: false });
    }
    //check if user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    // check if job exists or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      message: "Application submitted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error in applying for job",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({ applications, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error in fetching applied jobs",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error in fetching applicants",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const {status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }

    // Find application by ID
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // Update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error in updating application status",
      success: false,
    });
  }
};

