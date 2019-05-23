'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    authorid:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    likes:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};