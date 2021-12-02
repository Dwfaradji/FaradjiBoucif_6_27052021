import  express  from "express";

import { createSauce,getAllSauces } from "../controllers/sauces.js";

import { auth } from "../middleware/auth.js";

import { Multer } from "../middleware/multer-config.js";

const sauceRoutes = express.Router();
sauceRoutes.post("/sauces", auth, Multer, createSauce);
sauceRoutes.get("/sauces", auth, getAllSauces);

export default sauceRoutes