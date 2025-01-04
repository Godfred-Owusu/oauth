import express from "express";
const router = express.Router();

import {
  deleteUser,
  editUser,
  getAllUsers,
  loginUser,
  logout,
  signUpUser,
  verifyEmail,
} from "../controllers/userCtl.js";

router.get("/users", getAllUsers);
router.post("/users", signUpUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);
router.put("/editUser/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
