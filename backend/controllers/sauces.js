import sauceModel from "../models/sauce.js";
import fs from "fs";

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
  const sauceObjectModify = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  try {
    await sauceModel.updateOne(
      { _id: req.params.id },
      { ...sauceObjectModify, _id: req.params.id }
    );
    res.status(200).json({ message: "Sauce modifié" });
    return;
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function deleteSauce(req, res, next) {
  try {
    const sauce = await sauceModel.findOne({ _id: req.params.id });
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, async () => {
      await sauceModel.deleteOne({ _id: req.params.id });
    });
    res.status(200).json({ message: "Sauce supprimé" });
    return sauceModel;
  } catch (error) {
    res.status(400).json({ error });
    res.status(500).json({ error });
  }
}

async function getOneSauce(req, res, next) {
  try {
    const sauce = await sauceModel.findOne({ _id: req.params.id });
    res.status(200).json(sauce);
    return;
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getAllSauces(req, res, next) {
  try {
    const sauces = await sauceModel.find();
    res.status(200).json(sauces);
    return;
  } catch (error) {
    res.status(400).json({ error });
  }
}

//===================== Probleme like =====================//

async function likeSauce(req, res, next) {
  const reqBody = req.body;
  const like = reqBody.like;
  console.log(like);
  const userId = reqBody.userId;
  console.log(userId);
  const params = req.params.id;
  console.log(params);

  try {
    //await sauceModel.findOne({ _id: req.params.id });
    //Si le users like la sauce il se passera:
    switch (like) {
      case +1:
        await sauceModel.findOneAndUpdate(
          //Choisir l'article en question associé au user en question et envoyé le +1 Si user aime l'article
          { _id: req.params.id },
          { $push: { usersLiked: userId }, $inc: { likes: 1 } },
          console.log("Ajoute un like")
        );
        res.status(200).json({ message: "Sauce Liké !" });
        break;

      case -1:
        await sauceModel.findOneAndUpdate(
          //Choisir l'article en question associé au user en question et envoyé le -1 si user n'aime pas l'article
          { _id: req.params.id },
          {
            $push: { usersDisliked: userId },
            $inc: { dislikes: 1 },
          },
          console.log("Ajoute un dislike")
        );
        res.status(200).json({ message: "Sauce Disliké !" });
        break;

      case 0:
        await sauceModel.findOneAndUpdate(
          //Choisir l'article en question associé au user en question et envoyé le 0 si user annule le choi qu'il a fait d'aimer ou non
          { _id: req.params.id },
          { $pull: { usersLiked: userId }, $inc: { likes: 0 } },
          console.log("suprime like ou dislike")
        );
        await sauceModel.findOneAndUpdate(
          //   //Choisir l'article en question associé au user en question et envoyé le 0 si user annule le choi qu'il a fait d'aimer ou non
          { _id: req.params.id },
          { $pull: { usersDisliked: userId }, $inc: { dislikes: 0 } },
          console.log("suprime like ou dislike")
        );
        res.status(200).json({ message: "Like/Dislike annulé !" });
        // res.status(200).json({ message: "Like/Dislike annulé !" });
        break;
    }
  } catch (e) {
    res.status(400).json({ error });
  }
}

export {
  createSauce,
  getAllSauces,
  getOneSauce,
  modifySauce,
  deleteSauce,
  likeSauce,
};
//
//     Sauce.findOne({ _id: req.params.id })
//       .then(sauce => {
//         if (sauce.usersLiked.includes(req.body.userId)) {
//           Sauce.findOneAndUpdate( {_id:req.params.id}, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
//             .then(() => res.status(200).json({ message: `Je n'ai pas donné mon avis sur la sauce !`}))
//             .catch(error => res.status(400).json({ error }))
//         } else if (sauce.usersDisliked.includes(req.body.userId)) {
//           Sauce.findOneAndUpdate( {_id:req.params.id}, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
//             .then(() => res.status(200).json({ message: `Je n'ai pas donné mon avis sur la sauce !`}))
//             .catch(error => res.status(400).json({ error }))
//         }
