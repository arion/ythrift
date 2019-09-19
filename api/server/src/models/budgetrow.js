'use strict';
module.exports = (sequelize, DataTypes) => {
  const BudgetRow = sequelize.define('BudgetRow', {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    budgetCents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  BudgetRow.associate = function(models) {
    // associations can be defined here
    BudgetRow.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
  };
  return BudgetRow;
};