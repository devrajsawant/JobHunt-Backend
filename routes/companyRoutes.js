const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanyBySlug,
  updateCompany,
  getCompanyById
} = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");
// create company
router.post("/", authMiddleware, createCompany);
// read company details
router.get("/:slug", getCompanyBySlug);
// read company details by Id
router.get("/id/:id", getCompanyById);
// edit company details
router.put("/:slug", authMiddleware, updateCompany);

module.exports = router;
