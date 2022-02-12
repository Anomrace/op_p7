module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comment;
};
