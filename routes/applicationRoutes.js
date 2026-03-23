const express = require("express");
const router = express.Router();

const {
  applyToJob,
  getMyApplications,
  getJobApplications,
  //   updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

// Apply to a job
router.post("/", authMiddleware, applyToJob);

// Get logged-in user's applications
router.get("/me", authMiddleware, getMyApplications);

// // Get applications for a specific job (employer)
router.get("/job/:jobId", authMiddleware, getJobApplications);

// // Update application status (employer)
// router.patch("/:id/status", authMiddleware, updateApplicationStatus);

module.exports = router;
