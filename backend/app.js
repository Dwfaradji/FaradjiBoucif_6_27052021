// Va chercher le module express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

const appli = express();

appli.use(express.json());

//permet acceder à notre API depuis n'importe quelle origine
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

//connection a mongooseDb
function connectionBaseDeDonnée(params) {
mongoose
  .connect(
    "mongodb+srv://boucif:Tlemcen-66@cluster0.wxji3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
}
connectionBaseDeDonnée();


appli.use(bodyParser.json());

appli.use("/api/sauces", sauceRoutes);

appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api/auth/", userRoutes);

//on va pouvoir exporter le module app
module.exports = appli;
