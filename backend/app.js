// Va chercher le module express
const express = require("express");
const appli = express();

const json = express.json();
console.log(json);


//connection a mongooseDb
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://boucif:Tlemcen-66@cluster0.wxji3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

appli.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});
//on va pouvoir exporter le module app
module.exports = appli;
