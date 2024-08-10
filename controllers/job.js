const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const getJobs = async (req, res) => {
  const {
    user: { id: userId },
  } = req;

  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  res
    .status(StatusCodes.OK)
    .json({ msg: "Jobs fetched successfully.", data: jobs });
};

const getJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No Job found with this Id:${jobId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Single job fetched successfully", data: job });
};

const createJob = async (req, res) => {
  const userId = req.user.id;
  const job = await Job.create({ ...req.body, createdBy: userId });
  res
    .status(StatusCodes.CREATED)
    .send({ msg: "Job created successfully", data: job });
};

const updateJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  if (Object.keys(req.body).length === 0) {
    throw new BadRequestError(
      "Please provide at least one property to update."
    );
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Job updated successfully", data: job });
};

const deleteJob = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Job deleted successfully" });
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
