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

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findOne({ _id:id });

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

exports.updateCompany = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.userId;

    const company = await Company.findOne({ slug });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }
    if (company.ownerId.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to update this company",
      });
    }

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

    company.name = name ?? company.name;
    company.description = description ?? company.description;
    company.industry = industry ?? company.industry;
    company.size = size ?? company.size;
    company.location = location ?? company.location;
    company.logo = logo ?? company.logo;
    company.website = website ?? company.website;
    company.contactEmail = contactEmail ?? company.contactEmail;
    company.contactPhone = contactPhone ?? company.contactPhone;
    company.linkedin = linkedin ?? company.linkedin;
    company.twitter = twitter ?? company.twitter;

    const oldName = company.name;
    if (name) company.name = name;

    if (name && name !== oldName) {
      company.slug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update company",
      error: error.message,
    });
  }
};
