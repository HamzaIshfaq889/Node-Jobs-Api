const { BadRequestError, UnauthorizedError } = require("../errors/index");
const User = require("../models/user");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res
    .status(200)
    .json({ msg: "Registered Successfully", data: { user, token } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "Credentials not provided.Please give username and password."
    );
  }

  //getUser
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  //compare password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  //getToken
  const token = user.createJWT();

  res.status(200).send({ msg: "Login Successful", data: { user, token } });
};

module.exports = {
  register,
  login,
};
