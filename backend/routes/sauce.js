import express from "express";

import {
  createSauce,
  getAllSauces,
  getOneSauce,
  modifySauce,
  deleteSauce
  
} from "../controllers/sauces.js";

import { auth } from "../middleware/auth.js";

import { Multer } from "../middleware/multer-config.js";

const sauceRoutes = express.Router();
sauceRoutes.post("/sauces", auth, Multer, createSauce);
sauceRoutes.get("/sauces", auth, getAllSauces);
sauceRoutes.get("/sauces/:id", auth, getOneSauce);
sauceRoutes.put("/sauces/:id", auth ,modifySauce)
sauceRoutes.delete("/sauces/:id", auth ,Multer,deleteSauce)

export default sauceRoutes;
