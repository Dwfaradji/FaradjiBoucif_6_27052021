import sauceModel from "../models/sauce.js";
import fs from "fs";
const error = "message error";

async function createSauce(req, res) {
  const tokenId = req.token.userId;
  const userIdParse = JSON.parse(req.body.sauce);
  const userId = userIdParse.userId;
  //Contrôle des users
  if (tokenId !== userId) {
    return res.status(403);
  }

  // Contrôle des requêtes
  if (!req.body.sauce || !req.file.filename) {
    return res.status(400).json({ error });
  }

  const objetSauce = JSON.parse(req.body.sauce);
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

async function modifySauce(req, res) {
  //Contrôle des users
  if (!req.token.userId) {
    return res.status(403).json({ error });
  }

  if (!req.body || !req.params) {
    return res.status(400).json({ error });
  }

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

async function deleteSauce(req, res) {
  //Controle userId
  if (!req.token.userId) {
    return res.status(403).json({ error });
  }

  // Contrôle des requêtes
  if (!req.params.id) {
    return res.status(400).json({ error });
  }
  try {
    const oneSauce = await sauceModel.findOne({ _id: req.params.id });
    const filename = oneSauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, async () => {
      await sauceModel.deleteOne({ _id: req.params.id });
    });
    res.status(200).json({ message: "Sauce supprimé" });
    return sauceModel;
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getOneSauce(req, res) {
  // Contrôle des requêtes
  if (!req.params.id) {
    return res.status(400);
  }
  try {
    const oneSauce = await sauceModel.findOne({ _id: req.params.id });
    res.status(200).json(oneSauce);
    return;
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function getAllSauces(req, res) {
  try {
    const allSauces = await sauceModel.find();
    res.status(200).json(allSauces);
    return;
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function likeSauce(req, res) {
  const likeBody = req.body;
  const sauceId = req.params.id;
  const like = likeBody.like;
  const userId = likeBody.userId;

  // Contrôle des requêtes
  if (!sauceId || !likeBody) {
    return res.status(400).json({ error });
  }

  try {
    const sauce = await sauceModel.findOne({ _id: sauceId });

    //Si le users like la sauce il se passera:
    switch (like) {
      case +1:
        await sauceModel.updateOne(
          { _id: sauceId },
          { $push: { usersLiked: userId }, $inc: { likes: +1 } }
        );
        res.status(200).json({ message: "Sauce Liké !" });
        break;

      case -1:
        await sauceModel.updateOne(
          { _id: sauceId },
          { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } }
        );

        res.status(200).json({ message: "Sauce Disliké !" });
        break;

      case 0:
        if (sauce.usersLiked.includes(userId)) {
          await sauceModel.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
          );
          res.status(200).json({ message: "Like annulé !" });
        } else {
          await sauceModel.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
          );
          res.status(200).json({ message: "Dislike annulé !" });
        }
        break;
    }
  } catch (e) {
    res.status(500).json({ error });
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
