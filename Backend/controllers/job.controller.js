import { Job } from "../models/job.model.js";

//For
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.id; // middleware authentication (is the user logged in?)
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: salary,
      location,
      jobType,
      position,
      company: companyId,
      experience,
      created_by: userId,
    });
    return res
      .status(201)
      .json({ message: "Job posted successfully", job, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error in posting job", success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        // { requirements: { $regex: keyword, $options: "i" } },
        // { location: { $regex: keyword, $options: "i" } },
        // { jobType: { $regex: keyword, $options: "i" } },
        // { experienceLevel: { $regex: keyword, $options: "i" } },
        // { created_by: { $regex: keyword, $options: "i" } },
        // { position: { $regex: keyword, $options: "i" } },
        // { company: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ created_at: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error in fetching jobs", success: false });
  }
};

// For Users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error in fetching job by Id", success: false });
  }
};

// For Admin job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // getting id from middleware authentication
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt:-1,
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server Error in fetching admin jobs", success: false });
  }
};
