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
    const { position, location, experience, jobType, salary, workMode } =
      req.query;

    let query = {};

    if (position?.trim()) {
      query.title = { $regex: position, $options: "i" };
    }

    if (location?.trim()) {
      query.location = { $regex: location, $options: "i" };
    }

    if (experience?.trim()) {
      query.experienceLevel = experience;
    }

    if (jobType?.trim()) {
      query.jobType = jobType;
    }

    if (workMode?.trim()) {
      query.workMode = workMode;
    }

    if (salary) {
      if (salary === "0-5") {
        query.salary = { $lte: 500000 };
      } else if (salary === "5-10") {
        query.salary = { $gte: 500000, $lte: 1000000 };
      } else if (salary === "10+") {
        query.salary = { $gte: 1000000 };
      }
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return res.json(jobs);
  } catch (error) {
    console.error("Error in getSearchResults:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getSuggestions, getSearchResults };
