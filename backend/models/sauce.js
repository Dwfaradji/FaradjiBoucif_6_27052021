//Importer Mongoose
import mongoose from "mongoose";

async function controlShema() {
  if (!sauceSchema) {
    return res.status(400);
  }
}
//Crée le schéma de donnée
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },//****** RESTE A FAIRE  */
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
  userId: { type: String, required: true },
});

controlShema();
const modeleSauce = mongoose.model("Sauce", sauceSchema);

export default modeleSauce;
