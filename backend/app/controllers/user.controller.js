const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  
  
    


  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
      res.status(200).json({message: 'utilisateur crée' })
    })
    .catch(err => {
      res.status(500).send({ message: "Nom d'utilisateur ou email déjà utilisé" });
    });
};

exports.signin = (req, res) => {
User.findOne({
    where: {
      username: req.body.username
    }
  })


    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "utilisateur non trouvé." });
      }

      bcrypt.compare(
        req.body.password,
        user.password
      )
      .then(valid => {

        if(!valid) {
          return res.status(401).send({
            accessToken: null,
            message: "Password non valid!"
          }); 
        }
        res.status(200).json({
          userId: user._id,
          token : jwt.sign({
            userId: user.id
          }, 'TOKEN', {
            expiresIn:'24h'
          })
        })
      })
      .catch(error => res.status(500).json({ error }))
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
}


