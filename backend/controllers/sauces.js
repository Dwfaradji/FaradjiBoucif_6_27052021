import sauceModel from "../models/sauce.js";

async function createSauce(req, res, next) {
  const objetSauce = JSON.parse(req.body.sauce);
  console.log(objetSauce);
  delete objetSauce._id;
  const newSauce = new sauceModel({
    name: objetSauce.name,
    manufacturer: objetSauce.manufacturer,
    description: objetSauce.description,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    mainPepper: objetSauce.mainPepper,
    heat: objetSauce.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    userId: objetSauce.userId,
  });
  try {
    await newSauce.save();
    res.status(201).json({ message: "Sauce enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function modifySauce(req, res, next) {
  try {
    await sauceModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
    res.status(200).json({ message: "Sauce modifié" });
    return sauceModel;
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteSauce(req, res, next) {
  try {
    await sauceModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Sauce supprimé" });
    return sauceModel;
  } catch (error) {
    res.status(400).json({ error });
  }
}

//==================Probleme try catch =================

const getOneSauce = (req, res, next) => {
  sauceModel
    .findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

const getAllSauces = (req, res, next) => {
  sauceModel
    .find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// async function getOneSauce(req, res, next,sauce) {
//   try {
//     await sauceModel.findOne({ _id: req.params.id });
//     res.status(200).json();
//     return sauceModel;
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }

// async function getAllSauces(req, res, next) {
//   try {
//     await sauceModel.find(test);
//     res.status(200).json({ message: "Récupération de toutes les sauces" });
//     return;
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }

export { createSauce, getAllSauces, getOneSauce, modifySauce, deleteSauce };
