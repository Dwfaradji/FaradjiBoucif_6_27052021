const mongoose = require("mongoose");

const noForbiddenChar = function (data) {
  testChar = /[$\/<=>;]/.test(data);
  return !testChar;
};

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
    validate: [noForbiddenChar, "characteres interdits"],
  },
  manufacturer: {
    type: String,
    required: true,
    maxLength: 30,
    trim: true,
    validate: [noForbiddenChar, "characteres interdits"],
  },
  description: {
    type: String,
    required: true,
    maxLength: 250,
    trim: true,
    validate: [noForbiddenChar, "characteres interdits"],
  },
  mainPepper: {
    type: String,
    required: true,
    maxLength: 15,
    trim: true,
    validate: [noForbiddenChar, "characteres interdits"],
  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number, required: true, default: 0 },
  dislikes: { type: Number, required: true, default: 0 },
  usersLiked: { type: Array, required: true, default: [] },
  usersDisliked: { type: Array, required: true, default: [] },
});

module.exports = mongoose.model("Sauce", sauceSchema);
