const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: String,
  institute: String,
  year: String,
});

const experienceSchema = new mongoose.Schema({
  position: String,
  company: String,
  location: String,
  duration: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  demoLink: String,
  github: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: String,

    location: String,

    avatar: String,

    bio: String,

    employmentStatus: String,

    resume: String,

    skills: [String],

    socials: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String,
    },

    education: [educationSchema],

    experience: [experienceSchema],

    projects: [projectSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;