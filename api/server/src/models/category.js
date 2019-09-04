module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {})
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })

    Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'childrens' })
    Category.belongsTo(models.Category, { foreignKey: 'parentId', as: 'parent' })
  }
  return Category
}