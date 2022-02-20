// Défini les relations
function applyExtraSetup(sequelize) {
  const { User, Post, Comment } = sequelize.models;

  User.hasMany(Post, {
    onDelete: "cascade",
  });
  User.hasMany(Comment, {
    onDelete: "cascade",
  });
  Post.hasMany(Comment, {
    onDelete: "cascade",
  });
  Post.belongsTo(User);
  Comment.belongsTo(User);
  Comment.belongsTo(Post);
}

module.exports = { applyExtraSetup };
