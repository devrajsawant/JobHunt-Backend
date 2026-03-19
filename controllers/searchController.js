const Job = require("../models/jobModel");

const getSuggestions = async (req, res) => {
  try {
    const { q, type } = req.query;

    //  1. Validate query
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const searchRegex = new RegExp(q, "i"); // case-insensitive

    let results = [];

    //  2. Job title suggestions
    if (type === "job") {
      results = await Job.distinct("title", {
        title: searchRegex,
      });
    }

    //  3. Location suggestions
    else if (type === "location") {
      results = await Job.distinct("location", {
        location: searchRegex,
      });
    }

    //  4. Limit results
    results = results.slice(0, 6);

    return res.json(results);
  } catch (error) {
    console.error("Error in getSuggestions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSuggestions };
