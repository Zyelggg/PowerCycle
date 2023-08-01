const FeedbackReply = sequelize.define("FeedbackReply", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    replyMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  // Define a relationship between Feedback and FeedbackReply models
  Feedback.hasOne(FeedbackReply, { as: "reply", foreignKey: "feedbackId" });
  FeedbackReply.belongsTo(Feedback, { as: "feedback", foreignKey: "feedbackId" });