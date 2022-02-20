const jwt = require("jsonwebtoken");

// verifie l'authentification des accès api
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decodedToken = jwt.verify(token, "TOKEN_TEST");
    const userId = decodedToken.userId;
    req.userId = userId;

    if (req.body.userId && req.body.userId != userId) {
      throw "User id non valable";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "requête non authentifiée" });
  }
};
