import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
      {
        type: String,
      },
    ],
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
    // enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  position: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    default: null,
  },
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
