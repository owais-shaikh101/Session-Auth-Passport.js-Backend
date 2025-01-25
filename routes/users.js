import express from "express";
const router = express.Router();
import {
  register,
  login,
  loginSuccess,
  loginFailure,
  allUsers,
  profile,
} from "../controllers/users.js";

router.post("/register", register);
router.post("/login", login);
router.get("/login-success", loginSuccess);
router.get("/login-failure", loginFailure);
router.get("/", allUsers);
router.get("/profile", profile);

export default router;
