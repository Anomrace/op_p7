const express = require('express')
var router = require("express").Router();
const auth = require('../middleware/auth')
const comments = require("../controllers/comment.controller.js");

    // Creation d'un nouveau comment
    router.post("/", auth, comments.create);
  
    // trouver tous les comments
    router.get("/", auth, comments.findAll);
  
    // Trouver tous les posts publiés
    router.get("/published", auth, comments.findAllPublished);
  
    // trouver un comment avec un id
    router.get("/:id", auth, comments.findOne);
  
    // Modifier un post avec un id
    router.put("/:id", auth, comments.update);
  
    // supprimer un comment avec un id
    router.delete("/:id", auth, comments.delete);
  
    // Supprimer tous les comments
    router.delete("/", auth, comments.deleteAll);
  
    module.exports = router

