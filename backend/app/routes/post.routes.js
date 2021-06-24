
    const posts = require("../controllers/post.controller.js");
  
    var router = require("express").Router();
  
    // Creation d'un nouveau post
    router.post("/", posts.create);
  
    // trouver tous les posts
    router.get("/", posts.findAll);
  
    // Trouver tous les posts publiés
    router.get("/published", posts.findAllPublished);
  
    // trouver un post avec un id
    router.get("/:id", posts.findOne);
  
    // Modifier un post avec un id
    router.put("/:id", posts.update);
  
    // supprimer un post avec un id
    router.delete("/:id", posts.delete);
  
    // Supprimer tous les posts
    router.delete("/", posts.deleteAll);
  
module.exports = router