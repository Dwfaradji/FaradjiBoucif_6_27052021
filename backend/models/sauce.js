//Importer Mongoose
import mongoose from "mongoose";

async function controlShema() {
  if (!sauceSchema) {
    return res.status(400);
  }
}

const noForbiddenChar = function (data) {
  testChar = /[$\/<=>;]/.test(data);
  return !testChar;
};
//Crée le schéma de donnée
const sauceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  manufacturer: {
    type: String,
    required: true,
    maxLength: 30,
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
  },
  imageUrl: { type: String, required: true },
  mainPepper: {
    type: String,
    required: true,
    maxLength: 15,
  },
  heat: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
  userId: { type: String, required: true },
});

controlShema();
const modeleSauce = mongoose.model("Sauce", sauceSchema);

export default modeleSauce;
