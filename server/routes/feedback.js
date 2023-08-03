const express = require("express");
const router = express.Router();
const { Feedback,  Review, Sequelize  } = require("../models");
const yup = require("yup");

router.post("/submit-feedback", async (req, res) => {
    try {
      const {id, senderName, message,review } = req.body;
      console.log(message,senderName)
      // Create a new feedback entry in the database
      const feedbackEntry = await Feedback.create({
        senderName,
        message,
        sender_id:id,
        review,
      });
  
      // Send a response back to the client
      res.status(200).json(feedbackEntry);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// 2) Endpoint to fetch all feedbacks
router.get("/feedbacks", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.like]: `%${search}%` } },
      { email: { [Sequelize.Op.like]: `%${search}%` } },
    ];
  }
  let list = await Feedback.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
  });
  res.json(list);
});

// 3) Endpoint to update the status of a feedback entry
router.put("/update-feedback-status/:id", async (req, res) => {
    try {
      const feedbackId = req.params.id;
      const { status } = req.body;
  
      // Update the status of the feedback entry in the database
      const updatedFeedback = await Feedback.update(
        { status },
        {
          where: {
            id: feedbackId,
          },
        }
      );
  
      // Send a response back to the client
      res.status(200).json(updatedFeedback);
    } catch (error) {
      console.error("Error updating feedback status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



// 4) Endpoint to store a reply for a feedback entry
router.post("/submit-reply/:feedbackId", async (req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
      const { replyMessage } = req.body;
  
      // Find the feedback entry by ID
      const feedback = await Feedback.findByPk(feedbackId);
      if (!feedback) {
        return res.status(404).json({ error: "Feedback not found" });
      }
  
      // Create a new feedback reply and associate it with the feedback
      const reply = await FeedbackReply.findOne({
        where:{
            feedbackId:feedbackId
        }
      })
      if(!reply){ const feedbackReply = await FeedbackReply.create({
        replyMessage,
        feedbackId,
      });
    
      // Send a response back to the client
      res.status(200).json(feedbackReply);
    }else{
        console.error("Error submitting repl");
        res.status(500).json({ error: "already replied" });
    }
     
  
    } catch (error) {
      console.log(error)
    }
  });
  
  // 5) Endpoint to update the reply message for a feedback entry
router.put("/update-reply/:feedbackId", async (req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
      const { replyMessage } = req.body;
  
      // Find the feedback reply associated with the feedback
      const feedbackReply = await FeedbackReply.findOne({
        where: { feedbackId },
      });
  
      if (!feedbackReply) {
        return res.status(404).json({ error: "Feedback reply not found" });
      }
  
      // Update the reply message
      feedbackReply.replyMessage = replyMessage;
      await feedbackReply.save();
  
      // Send a response back to the client
      res.status(200).json(feedbackReply);
    } catch (error) {
      console.error("Error updating reply:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // 6) Endpoint to delete the reply for a feedback entry
router.delete("/delete-reply/:feedbackId", async (req, res) => {
    try {
      const feedbackId = req.params.feedbackId;
  
      // Find the feedback reply associated with the feedback
      const feedbackReply = await FeedbackReply.findOne({
        where: { feedbackId },
      });
  
      if (!feedbackReply) {
        return res.status(404).json({ error: "Feedback reply not found" });
      }
  
      // Delete the feedback reply
      await feedbackReply.destroy();
  
      // Send a response back to the client
      res.status(200).json({ message: "Feedback reply deleted successfully" });
    } catch (error) {
      console.error("Error deleting reply:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // 7) delete whole feedback
router.delete("/delete-feedback/:feedbackId", async (req, res) => {
    const feedbackId = req.params.feedbackId;
  
    try {
      // Start a transaction
      await sequelize.transaction(async (t) => {
        // Find the feedback and its reply associated with the feedback
        const feedback = await Feedback.findOne({
          where: { id: feedbackId },
          transaction: t,
        });
  
        if (!feedback) {
          return res.status(404).json({ error: "Feedback not found" });
        }
  
        const feedbackReply = await FeedbackReply.findOne({
          where: { feedbackId },
          transaction: t,
        });
  
        // Delete the feedback and its reply
        await feedbackReply?.destroy({ transaction: t });
        await feedback.destroy({ transaction: t });
      });
  
      // Send a response back to the client
      res.status(200).json({ message: "Feedback and its reply deleted successfully" });
    } catch (error) {
      console.error("Error deleting feedback and reply:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

 // 8)  Endpoint to get all replies
router.get("/replies", async (req, res) => {
    try {
      // Fetch all feedbacks along with their corresponding replies
      const feedbacksWithReplies = await Feedback.findAll({
        include: { model: FeedbackReply, as: "reply" },
      });
  
      res.json(feedbacksWithReplies);
    } catch (error) {
      console.error("Error fetching replies:", error);
      res.status(500).json({ error: "Error fetching replies" });
    }
  });

 
module.exports = router;
