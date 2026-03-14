const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    logo: {
      type: String,
      required: true,
    },

    website: {
      type: String,
    },

    contactEmail: {
      type: String,
    },

    contactPhone: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    twitter: {
      type: String,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    totalJobsPosted: {
      type: Number,
      default: 0,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
