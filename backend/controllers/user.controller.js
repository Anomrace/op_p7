const db = require("../models");
const fs = require("fs");
const User = db.users;
const Post = db.posts;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const config = require("../config/db.config");

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
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Nom d'utilisateur ou email déjà utilisé" });
    });
};

exports.signin = (req, res) => {
  // console.log(req.body);
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
                config.TOKEN,
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

exports.updateUser = (req, res, next) => {
  //console.log(req.file.filename)
  const id = req.params.id;

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const decodedToken = jwt.verify(token, config.TOKEN);
  const userId = decodedToken.userId;
  const userStatus = decodedToken.userStatus;

  User.findByPk(id)
    .then((data) => {
      console.log(data);
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
          .then((data) => {
            res.status(201).send({
              message: "Le profil a été modifié avec succès",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Erreur dans la mise à jour du profil id=" + id,
            });
          });
      } else {
        return res.status(501).json({
          message: "vous n'êtes pas authorisé à modifier ce profil",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le user id=" + id,
      });
    });
};

exports.deleteOneUser = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const decodedToken = jwt.verify(token, config.TOKEN);
  Post.findAll({
    where: { userId: id },
  }).then((data) => {
    console.log(data.length);

    data.forEach((Post) => {
      let filename = Post.image.split("/images/")[1];

      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("le fichier a bien été supprimé");
        }
      });
    });
  });
  User.findByPk(id)
    .then((data) => {
      // suppression de l'image de profil
      let filename = data.image.split("/images/")[1];
      console.log(filename);
      fs.unlink(`images/${filename}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("le fichier a bien été supprimé");
        }
      });
      // suppression des images de tous ses posts
      User.destroy({
        where: { id: id },
      })
        .then((data) => {
          res
            .status(200)
            .json({ message: "utilisateur supprimé avec succès " });
        })
        .catch((err) => {
          res.status(401).json({
            message:
              "un problème est survenu dans la suppresion de l'utilisateur",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le post id=" + id,
      });
    });
};
