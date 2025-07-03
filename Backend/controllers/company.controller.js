import Company from "../models/company.model.js";
export const register = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(404).json({
        message: "Company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company added Successfully",
      company, // model obect containing all key value pair
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id; // loggedIn user Id which shows only companies created by that particular user
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findById(companyId);
  if (!company) {
    return res.status(404).json({
      message: "Company not found",
    });
  }
  return res.status(200).json({
    company,
    success: true,
  });
};

// Update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    //cloudinary
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!comapny) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    return res.status(200).json({
      message: "Company data Updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Updating company failed" });
  }
};
