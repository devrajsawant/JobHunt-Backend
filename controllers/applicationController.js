const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

exports.applyToJob = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId, resume, coverLetter } = req.body;

    // 1. Validation
    if (!jobId || !resume) {
      return res.status(400).json({
        success: false,
        message: "Job ID and resume are required",
      });
    }

    // 2. Check job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // 3. Check job status
    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "Job is not accepting applications",
      });
    }

    // 4. Prevent duplicate
    const existing = await Application.findOne({ userId, jobId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job",
      });
    }

    // 5. Create application
    const application = await Application.create({
      userId,
      jobId,
      companyId: job.companyId,
      resume,
      coverLetter,
    });

    // 6. Increment count
    await Job.findByIdAndUpdate(jobId, {
      $inc: { applicationCount: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: application,
    });
  } catch (error) {
    console.error(error);

    // Handle duplicate index safety
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this job",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await Application.find({ userId })
      .populate({
        path: "jobId",
        select: "title location salary workMode experience companyId",
        populate: {
          path: "companyId",
          select: "name logo",
        },
      })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get My Applications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};