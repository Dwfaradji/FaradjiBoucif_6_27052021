// Va chercher le module express
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/user.js";
import sauceRoutes from "./routes/sauce.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const appli = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

//permet acceder à notre API depuis n'importe quelle origine
function accesSetHeader(params) {
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
accesSetHeader()

async function connectionBaseDeDonnée() {
  try {
    mongoose.connect(
      "mongodb+srv://boucif:Tlemcen-66@cluster0.wxji3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connexion à MongoDB réussie !");
  } catch (e) {
    console.log("Connexion à MongoDB échouée !");
  }
}
connectionBaseDeDonnée();

appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api", sauceRoutes);
appli.use("/api/auth/", userRoutes);
