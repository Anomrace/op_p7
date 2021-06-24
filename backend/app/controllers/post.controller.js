const db = require("../models");
const Post = db.posts;
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
    const post = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Sauver un post dans la DB
    Post.create(post)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue dans la création du post:"
        });
      });
  };

  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Post.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Un erreur est survenu lors de la recherche de tous les posts."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Post.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur pour le post id=" + id
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Post.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le post a été modifié avec succès"
          });
        } else {
          res.send({
            message: `Impossible de modifier le post id=${id}. Le post est peut etre introuvable ou le body est vide`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur dans la mise à jour du post id=" + id
        });
      });
  };


  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le post a été effacé avec succès"
          });
        } else {
          res.send({
            message: `Impossible de supprimer le post id=${id}. Peut être que le post n'a pas été trouvé!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur dans la suppression du post id=" + id
        });
      });
  };


  exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tous les posts ont été supprimé avec succès` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenu lors de la suppression des posts."
        });
      });
  };


  exports.findAllPublished = (req, res) => {
    Post.findAll({ where: { published: true } })
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

