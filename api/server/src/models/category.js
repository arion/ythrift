module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueCategoryCombo',
    },
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['income', 'expense']],
      },
      defaultValue: 'expense',
      unique: 'uniqueCategoryCombo',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueCategoryCombo',
    },
    parentId: {
      type: DataTypes.INTEGER,
      unique: 'uniqueCategoryCombo',
    },
    archivedAt: {
      type: DataTypes.DATE
    },
  }, {})
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })

    Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'childrens' })
    Category.belongsTo(models.Category, { foreignKey: 'parentId', as: 'parent' })

    Category.hasOne(models.BudgetRow, { foreignKey: 'categoryId', as: 'budgetRow' })
    Category.hasMany(models.ActualRow, { foreignKey: 'categoryId', as: 'actualRows' })
  }

  return Category
}