const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, getCompanyJobs, getJobById } = require("../controllers/jobsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/company/:slug", getCompanyJobs);
router.get("/:id", getJobById);

module.exports = router;
