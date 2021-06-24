const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

//
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port:8889,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
    
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// require db 
db.posts = require("./post.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);


db.comment = require("./comment.model.js")(sequelize, Sequelize);


// db.comment.belongsToMany(db.user,{
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
//   });

//   db.comment.belongsToMany(db.roles,{
//     through: "user_roles",
//     foreignKey: "roleId",
//     otherKey: "userId"
//   });

  module.exports = db;