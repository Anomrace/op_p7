const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require("../middleware/multer-config");

const userCtrl = require("../controllers/user.controller");

// Inscription d'un utilisateur
router.post("/signup", multer, userCtrl.signup);
// Connexion d'un utilisateur
router.post("/signin", userCtrl.signin);
// Vérifie l'utilisateur
router.post("/user", auth, userCtrl.checkUser);
// Trouve tous les utilisateurs
router.get("/findAllUsers", auth, userCtrl.findAllUsers);
// Trouve un utilisateur
router.get("/findUser", auth, userCtrl.findUser);
// Modifie l'utilisateur avec un id
router.put("/updateUser/:id", auth, multer, userCtrl.updateUser);
// supprimer un utilisateur avec un id
router.delete("/deleteOneUser/:id", auth, userCtrl.deleteOneUser);

module.exports = router;
