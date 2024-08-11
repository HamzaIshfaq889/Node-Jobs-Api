require("dotenv").config();
require("express-async-errors");
const express = require("express");
const api = express();
const serverless = require("serverless-http");
const notFound = require("../middleware/notFound");
const customErrorHandler = require("../middleware/customErrorHandler");
const authenticationMiddleware = require("../middleware/authentication");
const connectDB = require("../db/connect");

try {
  connectDB(process.env.MONGO_URI);
} catch (error) {
  console.log(error);
}

//routers
const authRouter = require("../routes/auth");
const jobRouter = require("../routes/job");

//middlewares
api.use(express.json());

//routes
api.get("/", (req, res) => {
  res.status(201).send("Welcome to Jobs api");
});
api.use("/api/v1/auth", authRouter);
api.use("/api/v1/jobs", authenticationMiddleware, jobRouter);

//Error handler middleware
api.use(customErrorHandler);
api.use(notFound);

module.exports.handler = serverless(app);
