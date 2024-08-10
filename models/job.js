const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide the company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provid position"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "declined"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provid user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
