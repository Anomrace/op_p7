const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const db = require("./models");

// const Comment = db.comment;
// var corsOptions = {
//   origin: "*"
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const userRoutes = require("./routes/user.routes");
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

db.sequelize.sync({ force: false });

module.exports = app;
