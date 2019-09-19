module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kind: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['income', 'expense']],
      },
      defaultValue: 'expense'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

    Category.hasMany(models.BudgetRow, { foreignKey: 'categoryId', as: 'budgetRows' })
    Category.hasMany(models.ActualRow, { foreignKey: 'categoryId', as: 'actualRows' })
  }

  Category.findOrCreateWithParent = async function({ kind, name, parentName, userId }) {
    try {
      let parentCategory = null

      if (parentName) {
        parentCategory = await Category.findOrCreate({ where: { userId, name: parentName, kind } })
      }

      const attributes = { userId, name, kind }

      if (parentCategory && parentCategory[0]) {
        attributes.parentId = parentCategory[0].id
      }

      return Category.findOrCreate({ where: attributes })
    } catch (error) {
      console.error({ kind, name, parentName, userId }, error)
      return null
    }
  }

  return Category
}