const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Valider la requête
    if (!req.body.title) {
      res.status(400).send({
        message: "Le contenu ne peut être vide"
      });
      return;
    }
  
    // Creer un post
    const comment = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Sauver un post dans la DB
    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue dans la création du commentaire"
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Comment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Un erreur est survenu lors de la recherche de tous les commentaires."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Comment.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur pour le commentaire id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le commentaire a été modifié avec succès"
          });
        } else {
          res.send({
            message: `Impossible de modifier le commentaire id=${id}. Le commentaire est peut etre introuvable ou le body est vide`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur dans la mise à jour du commentaire id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le commentaire a été effacé avec succès"
          });
        } else {
          res.send({
            message: `Impossible de supprimer le commentaire id=${id}. Peut être que le post n'a pas été trouvé!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur dans la suppression du commentaire id=" + id
        });
      });
  };


  exports.deleteAll = (req, res) => {
    Comment.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tous les commentaires ont été supprimé avec succès` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenu lors de la suppression des commentaires."
        });
      });
  };


  exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue"
        });
      });
  };



