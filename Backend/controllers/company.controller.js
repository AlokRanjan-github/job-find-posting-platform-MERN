import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// import path from "path";
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location, logo } = req.body;

    // Validate required fields
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    

    // Check for existing company with same name
    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "Company name already exists",
        success: false,
      });
    }

    // Create new company
    const company = await Company.create({
      name: companyName,
      description,
      website,
      location,
      logo,
      userId: req.id, //  Comes from JWT middleware
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error registering company Catch block:", error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Company name must be unique",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Server error while registering company",
      success: false,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching companies",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching company",
      success: false,
    });
  }
};

// Update company details
// export const updateCompany = async (req, res) => {
//   try {
//     const { companyName, description, website, location} = req.body;
//     const updateData = {};

//     // Only add fields to updateData if they are provided in the request
//     if (companyName !== undefined) updateData.name = companyName;
//     if (description !== undefined) updateData.description = description;
//     if (website !== undefined) updateData.website = website;
//     if (location !== undefined) updateData.location = location;
//     if (logo !== undefined) updateData.logo = logo;

//     // If no fields to update were provided
//     if (Object.keys(updateData).length === 0) {
//       return res.status(400).json({
//         message: "No update data provided",
//         success: false,
//       });
//     }

//     const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true, // This ensures that any mongoose validations are run on update
//     });

//     if (!company) {
//       return res.status(404).json({
//         message: "Company not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Company data updated successfully",
//       company,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Error updating company",
//       success: false,
//     });
//   }
// };

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;
    //  cloudinary setup

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
