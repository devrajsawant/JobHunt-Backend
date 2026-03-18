const express = require("express");
const router = express.Router();

const { createJob, getAllJobs, getCompanyJobs } = require("../controllers/jobsController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/company/:slug", getCompanyJobs);

module.exports = router;
