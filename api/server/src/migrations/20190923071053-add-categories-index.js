'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX combo_unique_categories_index ON "Categories" ("userId", kind, name) WHERE "parentId" IS NULL'
    );
    return queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX combo_unique_parent_categories_index ON "Categories" ("userId", kind, name, "parentId") WHERE "parentId" IS NOT NULL'
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      'DROP INDEX combo_unique_categories_index'
    );
    return queryInterface.sequelize.query(
      'DROP INDEX combo_unique_parent_categories_index'
    );
  }
};
