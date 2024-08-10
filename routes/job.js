const express = require("express");
const router = express.Router();
const {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} = require("../controllers/job");

router.route("/").get(getJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
