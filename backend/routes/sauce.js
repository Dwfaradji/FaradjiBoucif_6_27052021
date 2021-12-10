import express from "express";

import { auth } from "../middleware/auth.js";
import { multer } from "../middleware/multer-config.js";
import {
  createSauce,
  getAllSauces,
  getOneSauce,
  modifySauce,
  deleteSauce,
  likeSauce,
} from "../controllers/sauces.js";

const sauceRoad = express.Router();
sauceRoad.post("/sauces", auth, multer, createSauce);
sauceRoad.get("/sauces", auth, getAllSauces);
sauceRoad.get("/sauces/:id", auth, getOneSauce);
sauceRoad.put("/sauces/:id", auth, multer, modifySauce);
sauceRoad.delete("/sauces/:id", auth, deleteSauce);
sauceRoad.post("/sauces/:id/like", auth, likeSauce);

export default sauceRoad;
