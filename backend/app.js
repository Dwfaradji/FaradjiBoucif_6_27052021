import userRoad from "./routes/user.js";
import sauceRoad from "./routes/sauce.js";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import dotenv from "dotenv";
dotenv.config();

export const appli = express();

controllAccesSetHeader();
connectionsToTheDatabase();

//permet acceder à notre API depuis n'importe quelle origine
function controllAccesSetHeader() {
  appli.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
}

async function connectionsToTheDatabase() {
  try {
    mongoose.connect(process.env.MONGO_ENV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie !");
  } catch (e) {
    console.log("Connexion à MongoDB échouée !");
  }
}

appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api", sauceRoad);
appli.use("/api/auth/", userRoad);
