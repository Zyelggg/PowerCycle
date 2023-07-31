module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define("Reward", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Reward;
};
