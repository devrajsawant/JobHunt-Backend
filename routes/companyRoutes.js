const express = require("express");
const router = express.Router();

const { createCompany, getCompanyBySlug} = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCompany);
// public route
router.get("/:slug", getCompanyBySlug);

module.exports = router;