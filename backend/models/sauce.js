//Importer Mongoose
import mongoose from "mongoose";

async function controlShema(res) {
  if (!sauceSchema) {
    return res.status(400);
  }
}

const noForbiddenChar = async function (res, data) {
  const testChar = /[$\/<=>;]/.test(data);
  if (testChar) {
    return res.status(401);
  }
};

//Crée le schéma de donnée

const sauceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    validate: [noForbiddenChar, "charactére interdit"],
  },
  manufacturer: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
    validate: [noForbiddenChar, "charactére interdit"],
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
    trim: true,
    validate: [noForbiddenChar, "charactére interdit"],
  },
  imageUrl: { type: String, required: true },
  mainPepper: {
    type: String,
    required: true,
    maxLength: 15,
    trim: true,
    validate: [noForbiddenChar, "charactére interdit"],
  },
  heat: { type: Number, min: 0, max: 10, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
  userId: { type: String, required: true },
});

controlShema();

const modeleSauce = mongoose.model("Sauce", sauceSchema);

export default modeleSauce;
