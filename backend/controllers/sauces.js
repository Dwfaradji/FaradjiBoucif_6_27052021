const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
  // const sauceObject = JSON.parse(req.body);
  console.log(req.body);
  const sauce = new Sauce({
    ...req.body,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "sauce enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//===============================
// exports.createSauce = (req, res, next) => {
//   const sauceObject = JSON.parse(req.bodyParser.sauce);
//   delete sauceObject._id;
//   const sauce = new Sauce({
//     userId: sauceObject.userId,
//     name: sauceObject.name,
//     manufacturer: sauceObject.manufacturer,
//     description: sauceObject.description,
//     mainPepper: sauceObject.mainPepper,
//     imageUrl: `${req.protocol}://${req.get("host")}/images/${
//       req.file.filename
//     }`,
//     heat: sauceObject.heat,
//     likes: 0,
//     dislikes: 0,
//     usersLiked: [sauceObject.userId],
//     usersDisliked: [sauceObject.userId],
//   });
//   if (sauce.userId === req.body.userId) {
//     sauce
//       .save()
//       .then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
//       .catch((error) => res.status(400).json(error.message));
//   } else {
//     res.status(401).json({ error: "userId usurpé : impossible de créer" });
//   }
// };
