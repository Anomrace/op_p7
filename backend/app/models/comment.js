module.exports = (sequelize, DataTypes) => {
const Comment = sequelize.define("Comment", {
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

return Comment
}