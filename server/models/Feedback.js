module.exports = (sequelize, DataTypes) => {
const Feedback = sequelize.define("Feedback", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, 
      defaultValue: "pending", // Set a default value for the new column if needed
    },
     sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
    
  });

  return Feedback
}