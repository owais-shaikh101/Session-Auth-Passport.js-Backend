import StatusCodes from "http-status-codes";
import User from "../models/user.js";
import passport from "passport";

const register = (req, res) => {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    (err, msg) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

const login = passport.authenticate("local", {
  failureRedirect: "login-failure",
  successRedirect: "login-success",
});
(err, req, res, next) => {
  if (err) next(err);
};

const loginSuccess = (req, res, next) => {
  console.log(req.session);
  res.send("Login Successful!");
};

const loginFailure = (req, res, next) => {
  console.log(req.session);
  res.send("Your username, email or password is incorrect, Please try again!");
};

const allUsers = async (req, res) => {
  const users = await User.find({});
  if (users.length === 0) {
    res.status(StatusCodes.OK).send("No users found!");
  } else {
    res.status(StatusCodes.OK).json({ users });
  }
};

const profile = (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.json({ message: "You are authenticated." });
  } else {
    res.json({ message: "You are not authenticated." });
  }
};

export { register, login, loginSuccess, loginFailure, allUsers, profile };
