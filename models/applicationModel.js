const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "accepted"],
      default: "pending",
    },

    resume: {
      type: String,
      required: true,
    },

    coverLetter: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
