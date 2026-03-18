const Job = require("../models/jobModel");
const company = require("../models/companyModel");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      workMode,
      experience,
      location,
      salary,
      description,
      skills,
    } = req.body;

    const job = new Job({
      title,
      description,
      skills,
      location,
      salary,
      experience,
      workMode,
      companyId: company,
    });

    await job.save();

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

exports.getCompanyJobs = async (req, res) => {
  try {
    const { slug } = req.params;

    // Find the company by slug
    const companyData = await company.findOne({ slug });
    if (!companyData) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Find jobs for this company
    const jobs = await Job.find({ companyId: companyData._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Company jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch company jobs",
      error: error.message,
    });
  }
};
