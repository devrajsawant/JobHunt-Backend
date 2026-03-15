const Job = require("../models/jobModel");

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
      // temporary until company system is added
      companyId: req.userId,
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
