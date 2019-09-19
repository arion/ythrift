'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActualRow = sequelize.define('ActualRow', {
    description: {
      type: DataTypes.STRING,
    },
    actualCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  ActualRow.associate = function(models) {
    // associations can be defined here
    ActualRow.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
  };
  return ActualRow;
};