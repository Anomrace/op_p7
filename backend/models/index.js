// connexion avec la base et définition des tables
const dbConfig = require("../config/db.config.js");
const { applyExtraSetup } = require("./extra-setup");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: dbConfig.dialect,
    port: process.env.DB_PORT,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// require db
db.posts = require("./post.js")(sequelize, Sequelize);
db.users = require("./user.js")(sequelize, Sequelize);
db.comments = require("./comment.js")(sequelize, Sequelize);

applyExtraSetup(sequelize);

module.exports = db;
