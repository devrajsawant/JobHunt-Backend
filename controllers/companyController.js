const Company = require("../models/companyModel");

exports.createCompany = async (req, res) => {
  try {
    const {
      name,
      description,
      industry,
      size,
      location,
      logo,
      website,
      contactEmail,
      contactPhone,
      linkedin,
      twitter,
    } = req.body;

    const userId = req.userId;

    // Check if user already owns a company
    const existingCompany = await Company.findOne({ ownerId: userId });

    if (existingCompany) {
      return res.status(400).json({
        message: "User already owns a company",
      });
    }

    // create slug
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const company = new Company({
      name,
      description,
      industry,
      size,
      location,
      logo,
      website,
      contactEmail,
      contactPhone,
      linkedin,
      twitter,
      slug,
      ownerId: userId,
    });

    await company.save();

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create company",
      error: error.message,
    });
  }
};

exports.getCompanyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const company = await Company.findOne({ slug });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company",
      error: error.message,
    });
  }
};