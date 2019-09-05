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
        isIn: [['income', 'expense', 'saving']],
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
  }
  return Category
}