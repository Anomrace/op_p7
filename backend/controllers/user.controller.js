const db = require("../models");
const fs = require("fs");

const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const user = require("../models/user");

exports.signup = (req, res, next) => {
  console.log(req.body, req.file);

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    biography: req.body.biography,
    status: 0,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
  })
    .then(() => {
      res.status(200).json({ message: "utilisateur crée" });
      //fs.writeFileSync(__dirname + 'images' + image.name, image.data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Nom d'utilisateur ou email déjà utilisé" });
    });
};

exports.signin = (req, res) => {
  // console.log(req.body)
  User.findOne({
    where: {
      username: req.body.username,
    },
  })

    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé." });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              accessToken: null,
              message: "Password non valid!",
            });
          } else {
            res.status(200).json({
              userId: user.id,
              userName: user.username,
              userEmail: user.email,
              userStatus: user.status,
              userImage: user.image,
              token: jwt.sign(
                {
                  userId: user.id,
                  userStatus: user.status,
                },
                "TOKEN_TEST",
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findUser = (req, res) => {
  // console.log(req.userId)
  User.findOne({
    where: {
      id: req.userId,
    },
  })

    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(401).json({ message: err.message }));
};

exports.findAllUsers = (req, res) => {
  // console.log(req.userId)
  User.findAll({
    where: {},
  })

    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => res.status(401).json({ message: err.message }));
};

exports.checkUser = (req, res, next) => {
  // console.log(res)
  res.status(200).json({ user: true });
};

// exports.test = (req, res, next) => {
//   console.log("ok");
//   fs.unlink(`app/images/beethoven_jpeg1643893200415.jpg`, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("le fichier a bien été supprimé");
//     }
//   });
// };

exports.updateUser = (req, res, next) => {
  //console.log(req.file.filename)
  const id = req.params.id;

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const decodedToken = jwt.verify(token, "TOKEN_TEST");
  const userId = decodedToken.userId;
  const userStatus = decodedToken.userStatus;

  User.findByPk(id).then((data) => {
    if (data.id === userId || userStatus === 1) {
      let newUsername = data.username;
      let newEmail = data.email;
      let newPassword = data.password;
      let newImage = data.image;
      let newBiography = data.biography;

      if (req.body.username) {
        newUsername = req.body.username;
      }

      if (req.body.email) {
        newEmail = req.body.email;
      }
      if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 8);
      }

      if (req.file) {
        let filename = data.image.split("/images/")[1];
        fs.unlink(
          `images/${filename}`,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("le fichier a bien été supprimé");
            }
          },
          (newImage = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`)
        );
      }

      if (req.body.biography) {
        newBiography = req.body.biography;
      }

      User.update(
        {
          username: newUsername,
          email: newEmail,
          biography: newBiography,
          password: newPassword,
          image: newImage,
        },
        {
          where: { id: id },
        }
      )
        .then((body) => {
          res.status(201).send({
            message: "Le profil a été modifié avec succès",
          });
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Erreur dans la mise à jour du profil id=" + id });
        });
    } else {
      return res.status(501).json({
        message: "vous n'êtes pas authorisé à modifier ce profil",
      });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  //supprimer un utilisateur par lui même ou par l'administrateur
};

exports.deleteAllUser = (req, res, next) => {
  //supprimer tous les utilisateurs sauf l'administrateur
};
