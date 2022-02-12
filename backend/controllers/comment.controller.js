const db = require("../models");
const Post = db.posts;
const User = db.users;
const Comment = db.comments;
const post = require("../models/post");
const user = require("../models/user");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.content) {
    res.status(400).send({
      message: "Le contenu ne peut être vide",
    });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const decodedToken = jwt.verify(token, "TOKEN_TEST");
  const userId = decodedToken.userId;
  console.log(req.body);
  // const postId =

  // Sauver un post dans la DB
  Comment.create({
    content: req.body.content,
    UserId: userId,
    PostId: req.body.postID,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue dans la création du post:",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Le post a été modifié avec succès",
        });
      } else {
        res.send({
          message: `Impossible de modifier le post id=${id}. Le post est peut etre introuvable ou le body est vide`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur dans la mise à jour du comment id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Le comment a été effacé avec succès",
        });
      } else {
        res.send({
          message: `Impossible de supprimer le comment id=${id}. Peut être que le comment n'a pas été trouvé!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur dans la suppression du comment id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Tous les comments ont été supprimé avec succès`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenu lors de la suppression des comments.",
      });
    });
};
