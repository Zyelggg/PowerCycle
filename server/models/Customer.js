module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    membership: {
      type: DataTypes.ENUM("Basic", "Premium", "Gold"),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  return Customer;
}

