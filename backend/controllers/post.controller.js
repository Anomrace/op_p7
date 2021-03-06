const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const config = require("../config/db.config");

// Création d'un post
exports.create = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "config.TOKEN");
  const userId = decodedToken.userId;

  Post.create({
    title: req.body.title,
    content: req.body.content,
    image: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
    UserId: userId,
  })

    .then((data) => {
      res.status(201).send({ message: "le post a bien été créé" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Une erreur est survenue dans la création du post:",
      });
    });
};

// Trouver tous les posts
exports.findAll = (req, res) => {
  Post.findAll({
    order: [["updatedAt", "DESC"]],
    include: [
      { model: User },
      {
        model: Comment,
        include: [{ model: User }],
      },
    ],
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Un erreur est survenu lors de la recherche de tous les posts.",
      });
    });
};

// Trouver un post avec l'id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le post id=" + id,
      });
    });
};

// Modifier un post

exports.update = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "config.TOKEN");
  const userId = decodedToken.userId;
  const userStatus = decodedToken.userStatus;

  console.log(req.body, req.file);
  Post.findByPk(id)
    // si le poste existe

    .then((data) => {
      console.log(data);
      // si l'id de l'utilisateur qui essaye de modifier le poste correspond à l'utilisateur qui l'a crée ou si le userID est celui de l'administrateur alors
      if (data.UserId === userId || userStatus === 1) {
        // création de MonImage qui correspond à l'image actuellement utilisée par le post
        let newImage = data.image;
        let newTitle = data.title;
        let newContent = data.content;
        // console.log(MonImage, req.file);
        if (req.body.title) {
          newTitle = req.body.title;
        }
        if (req.body.content) {
          newContent = req.body.content;
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

        // Condition si un fichier est envoyé dans la requete alors il faut

        Post.update(
          {
            title: newTitle,
            content: newContent,
            image: newImage,
          },
          {
            where: { id: id },
          }
        )
          .then((data) => {
            res.status(201).send({
              message: "Le post a été modifié avec succès",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Erreur dans la mise à jour du post id=" + id,
            });
          });
      }

      // si le userID ne correspond ni au premier cas ni au deuxième alors
      else {
        res.status(400).send({
          message: "il ne vous est pas permis de modifier ce poste",
        });
      }
    })
    // si le poste n'existe pas
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le post id=" + id,
      });
    });
};

// Supprimer un post
exports.delete = (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "config.TOKEN");
  const userId = decodedToken.userId;
  const userStatus = decodedToken.userStatus;

  Post.findByPk(id)
    .then((data) => {
      if (data.UserId === userId || data.UserStatus === userStatus) {
        if (data.image !== null) {
          let filename = data.image.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("le fichier a bien été supprimé");
            }
          });
        }
        Post.destroy({
          where: { id: id },
        })
          .then((data) => {
            res.status(200).json({ message: "post supprimé avec succès " });
          })
          .catch((err) => {
            res.status(401).json({
              message: "un problème est survenu dans la suppresion du post",
            });
          });
      } else {
        res.status(400).send({
          message: "il ne vous est pas permis de supprimer ce poste",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le post id=" + id,
      });
    });
};
