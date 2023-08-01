'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Feedbacks', 'review', {
      type: Sequelize.INTEGER,
      allowNull: true, // Change this to false if you want the review to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Feedbacks', 'review');
  }
};
