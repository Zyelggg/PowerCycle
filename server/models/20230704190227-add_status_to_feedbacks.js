'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Feedbacks', 'status', {
      type: Sequelize.STRING, // You can use any other suitable data type like BOOLEAN, ENUM, etc.
      defaultValue: 'pending', // Set a default value for the new column if needed
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Feedbacks', 'status');
  },
};
