const express = require("express");
var router = require("express").Router();
const auth = require("../middleware/auth");
const comments = require("../controllers/comment.controller.js");

// Creation d'un nouveau comment
router.post("/", auth, comments.create);

// Modifier un post avec un id
router.put("/:id", auth, comments.update);

// supprimer un comment avec un id
router.delete("/:id", auth, comments.delete);

module.exports = router;
