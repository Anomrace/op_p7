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
          err.message ||
          "Une erreur est survenue dans la création du commentaire:",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const decodedToken = jwt.verify(token, "TOKEN_TEST");
  const userId = decodedToken.userId;
  const userStatus = decodedToken.userStatus;

  console.log(req.body, id);

  Comment.findByPk(id)
    .then((data) => {
      if (data.UserId === userId || data.UserStatus === userStatus) {
        Comment.update(
          {
            content: req.body.content,
          },
          {
            where: { id: id },
          }
        )
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Le commentaire a été modifié avec succès",
              });
            } else {
              res.send({
                message: `Impossible de modifier le commentaire id=${id}. Le post est peut etre introuvable ou le body est vide`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Erreur dans la mise à jour du commentaire id=" + id,
            });
          });
      } else {
        res.status(400).send({
          message: "il ne vous est pas permis de modifier ce commentaire",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur pour le post id=" + id,
      });
    });
  // Comment.update(
  //   {
  //     content: req.body.content,
  //   },
  //   {
  //     where: { id: id },
  //   }
  // )
  //   .then((num) => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Le commentaire a été modifié avec succès",
  //       });
  //     } else {
  //       res.send({
  //         message: `Impossible de modifier le commentaire id=${id}. Le post est peut etre introuvable ou le body est vide`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Erreur dans la mise à jour du commentaire id=" + id,
  //     });
  //   });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Le commentaire a été effacé avec succès",
        });
      } else {
        res.send({
          message: `Impossible de supprimer le commentaire id=${id}. Peut être que le commentaire n'a pas été trouvé!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur dans la suppression du commentaire id=" + id,
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
        message: `${nums} Tous les commentaires ont été supprimé avec succès`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur est survenu lors de la suppression des commentaires.",
      });
    });
};
