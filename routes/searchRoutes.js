const express = require("express");
const router = express.Router();

const { getSuggestions, getSearchResults } = require("../controllers/searchController");

router.get("/suggestions", getSuggestions);
router.get("/results", getSearchResults);

module.exports = router;
