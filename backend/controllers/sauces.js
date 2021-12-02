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

const getAllSauces = (req, res, next) => {
  sauceModel
    .find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
//----A voir pourquoi cela ne fonctionne pas 
// async function getAllSauces(req, res, next) {
//   try {
//     await sauceModel.find();
//     res.status(200).json({ message: "Récupération des sauces enregistré" });
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }

export { createSauce, getAllSauces };
