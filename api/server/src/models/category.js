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
    Category.belongsTo(models.User, { foreignKey: 'userId', as: 'User' })

    Category.hasMany(models.Category, { foreignKey: 'parentId', as: 'Children' })
    Category.belongsTo(models.Category, { foreignKey: 'parentId', as: 'Parent' })
  }
  return Category
}