'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Categories', ['userId', 'kind', 'name'], {
      type: 'unique',
      name: 'combo_unique_categories_index',
      where: {
        parentId: {
          [Sequelize.Op.eq]: null
        },
        archivedAt: {
          [Sequelize.Op.eq]: null
        },
      }
    });
    return queryInterface.addConstraint('Categories', ['userId', 'parentId', 'kind', 'name'], {
      type: 'unique',
      name: 'combo_unique_categories_parent_index',
      where: {
        parentId: {
          [Sequelize.Op.ne]: null
        },
        archivedAt: {
          [Sequelize.Op.eq]: null
        },
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Categories', 'combo_unique_categories_index')
    return queryInterface.removeConstraint('Categories', 'combo_unique_categories_parent_index')
  }
};
