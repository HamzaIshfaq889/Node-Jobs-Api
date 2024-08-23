require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const notFound = require("../middleware/notFound");
const customErrorHandler = require("../middleware/customErrorHandler");
const authenticationMiddleware = require("../middleware/authentication");
const connectDB = require("../db/connect");
const port = process.env.PORT || 5000;

//routers
const authRouter = require("../routes/auth");
const jobRouter = require("../routes/job");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(201).send("Welcome to Jobs app");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobRouter);

//Error handler middleware
app.use(customErrorHandler);
app.use(notFound);

const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
