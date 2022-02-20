const express = require("express");
const posts = require("../controllers/post.controller.js");
const auth = require("../middleware/auth");
var router = require("express").Router();
const multer = require("../middleware/multer-config");

// Creation d'un nouveau post
router.post("/", auth, multer, posts.create);

// trouver tous les posts
router.get("/", auth, posts.findAll);

// trouver un post avec un id
router.get("/:id", auth, posts.findOne);

// Modifier un post avec un id
router.put("/:id", auth, multer, posts.update);

// supprimer un post avec un id
router.delete("/:id", auth, posts.delete);

module.exports = router;
