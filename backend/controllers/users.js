import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";

async function signup(req, res, next) {
  try {
    const Hash = await bcrypt.hash(req.body.password, 10);
    const userSave = new user({
      email: req.body.email,
      password: Hash,
    });
    await userSave.save();
    res.status(201).json({ message: "Utilisateur crée" });
  } catch (error) {
    res.status(500).json({ error });
    res.status(400).json({ error });
  }
}

async function login(req, res, next) {
  try {
    const User = await user.findOne({ email: req.body.email });
    if (!User) {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
    const valid = await bcrypt.compare(req.body.password, User.password);
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect !" });
    } else {
      res.status(200).json({
        userId: User._id,
        token: jwt.sign({ userId: User._id }, "RAMDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { login, signup };
