module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'User',
  });



  return User
}





    // const {
    //   Model
    // } = require('sequelize');
    // module.exports = (sequelize, DataTypes) => {
    //   class User extends Model {
    //     /**
    //      * Helper method for defining associations.
    //      * This method is not a part of Sequelize lifecycle.
    //      * The `models/index` file will call this method automatically.
    //      */
    //     static associate(models) {
    //       // define association here
    //       models.user.hasMany(models.post);
    //       models.user.hasMany(models.comment);
    //     }
    //   };
    //   User.init({
    //     username: {
    //       type: DataTypes.STRING,
    //       allowNull: false
    //     },
    //     email: {
    //       type: DataTypes.STRING,
    //       allowNull: false,
    //       unique: true
    //     },
    //     password: {
    //       type: DataTypes.STRING,
    //       allowNull: false
    //     },
    //     image: {
    //       type: DataTypes.STRING,
    //       allowNull: true
    //     },
    //     biography: {
    //       type: DataTypes.STRING,
    //       allowNull: true
    //     },
    //   }, {
    //     sequelize,
    //     modelName: 'User',
    //   });
    //   return User;
    // };

    
  

  
  

