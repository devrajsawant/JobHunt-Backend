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

const getSearchResults = async (req, res) => {
  try {
    const { position, location, experience } = req.query;

    let query = {};

    // 1. Position (job title search)
    if (position && position.trim() !== "") {
      query.title = { $regex: position, $options: "i" };
    }

    // 2. Location filter
    if (location && location.trim() !== "") {
      query.location = { $regex: location, $options: "i" };
    }

    // 3. Experience filter
    if (experience && experience.trim() !== "") {
      query.experienceLevel = experience; 
      // make sure this matches your schema field
    }

    // 4. Fetch jobs
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return res.json(jobs);
  } catch (error) {
    console.error("Error in getSearchResults:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSuggestions, getSearchResults };
