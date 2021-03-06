import { signup, login } from "../controllers/users.js";
import express from "express";

const userRoad = express.Router();
userRoad.post("/signup/", signup);
userRoad.post("/login", login);

export default userRoad;
