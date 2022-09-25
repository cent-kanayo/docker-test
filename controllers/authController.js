const User = require("../models/usersModel");

const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        status: "Fail",
        msg: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ username, password: hashedPassword });
    req.session.user = newUser;
    res.status(201).json({
      status: "Success",
      result: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      msg: "Something went wrong",
    });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        msg: "No user found",
      });
    }

    const isCorrect = bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: "Success",
        result: user,
      });
    } else {
      res.status(401).json({
        status: "Fail",
        msg: "Incorrect username or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      msg: "Something went wrong",
    });
  }
};

module.exports = { signup, login };
