const { DataTypes } = require('sequelize');

// add bycrypt to ecnrypt information!!

module.exports = (sequelize) => {
  const Payment = sequelize.define(
    'Payment',
    {
      cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardHolderName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expirationDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'payments', // Assuming the table name is 'payments'
      timestamps: true, // If you want to include timestamps (createdAt, updatedAt) in the model
    }
  );

  // Define any associations or class methods for the Payment model if needed

  return Payment;
};
