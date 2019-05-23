'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArticleLike = sequelize.define('ArticleLike', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER
  }, {});
  ArticleLike.associate = function(models) {
    // associations can be defined here
    ArticleLike.belongsTo(models.User,{foreignKey:'userid'});
    ArticleLike.belongsTo(models.Article,{foreignKey:'articleid'});
  };
  return ArticleLike;
};