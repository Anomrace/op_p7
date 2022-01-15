function applyExtraSetup(sequelize) {
	const { User, Post, Comment } = sequelize.models;

	User.hasMany(Post);
    User.hasMany(Comment)
    Post.hasMany(Comment);
	Post.belongsTo(User);
    Comment.belongsTo(User);
    Comment.belongsTo(Post);
    
}

module.exports = { applyExtraSetup };
