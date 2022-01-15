const db = require("../models");
const fs = require('fs');

const User = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const exp = require("constants");
const user = require("../models/user");


exports.signup = (req, res, next) => {
  
  console.log(req.body, req.file)
  
  User.create({
    
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    biography: req.body.biography,
    image:  req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
  
  })
    .then(() => {
      res.status(200).json({message: 'utilisateur crée' })
      //fs.writeFileSync(__dirname + 'images' + image.name, image.data)
    })
    .catch(err => {
      res.status(500).send({ message: "Nom d'utilisateur ou email déjà utilisé" });
    });
};


exports.signin = (req, res) => {
  // console.log(req.body)
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
          return res.status(401).json({
            accessToken: null,
            message: "Password non valid!"
          }); 
        }
        else{
          res.status(200).json({
            userId: user.id,
            userName: user.username,
            userEmail: user.email,
            token : jwt.sign({
              userId: user.id,
              status: user.status,
            }, 'TOKEN_TEST', {
              expiresIn:'24h'
            })
          })
        }
        
      })
      .catch(error => res.status(500).json({ error }))
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  
}

exports.findUser = (req, res) => {
  // console.log(req.userId)
  User.findOne({
    where: {
      id: req.userId
    }
  })
  
  .then(data =>{
    res.status(200).send(data)
  })
  .catch(err => res.status(401).json({message : err.message}))
}


exports.checkUser = (req, res, next) => {
  console.log(res)
 res.status(200).json({ user:true,
  
 });
 
 
}

exports.updateUser = (req, res, next) =>{
  console.log(req.body, req.params.id)
  // const id = req.params.id;
  
  //   const token = req.headers.authorization.split(' ')[1]
  //   // console.log(token);
  //   const decodedToken = jwt.verify(token, 'TOKEN_TEST')
  //   const userId = decodedToken.userId

    
  //   User.findOne({
  //     where: {
  //       id: req.userId
  //     }
  //   })
  
  // .then(user =>{
  //   res.status(200).send(user)
  // })
  // .catch(err => res.status(401).json({message : err.message}))
   
}


