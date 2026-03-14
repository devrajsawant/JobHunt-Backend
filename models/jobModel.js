const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],

    location: { type: String, required: true },
    salary: { type: String },
    experience: { type: String },

    workMode: { type: String, required: true },
    jobType: { type: String },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    applicationCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      default: "open",
    },

    expiresAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
