module.exports = (sequelize, DataTypes) => {
const Post = sequelize.define("Post", {
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    sequelize,
    modelName: 'Post',
  })


return Post
}