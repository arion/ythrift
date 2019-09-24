'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('BudgetRows', ['categoryId', 'month', 'year'], {
      type: 'unique',
      name: 'combo_unique_budget_rows_index',
      where: {
        parentId: {
          [Sequelize.Op.eq]: null
        },
        archivedAt: {
          [Sequelize.Op.eq]: null
        },
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('BudgetRows', 'combo_unique_budget_rows_index')
  }
};
