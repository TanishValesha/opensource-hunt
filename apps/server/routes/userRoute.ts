import express from "express";
const router = express.Router();
import {
  getUserDetails
} from "../controller/userController";

router.post("/user", getUserDetails);

export default router;