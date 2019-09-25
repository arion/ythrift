'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX combo_unique_budget_rows_index ON "BudgetRows" ("categoryId", month, year)'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      'DROP INDEX combo_unique_budget_rows_index'
    );
  }
};
