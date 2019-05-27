'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    articleid: DataTypes.INTEGER,
    description: DataTypes.STRING,
    authorid: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User,{foreignKey:'authorid'});
    Comment.belongsTo(models.Article,{foreignKey:'articleid'});
  };
  return Comment;
};