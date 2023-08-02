const express = require('express');
const router = express.Router();
const { Ridden, Sequelize } = require('../models');
const yup = require('yup');

// Define the validation schema for the request body
const schema = yup.object().shape({
  userId: yup.number().required(),
  mileage: yup.number().required(),
  electricity: yup.number().required(),
  bikeId: yup.number().required(),
});

// Define the POST route for creating a new Ridden instance
router.post("/", async (req, res) => {
  try {
    // Validate the request body against the schema
    await schema.validate(req.body);

    // Extract the data from the request body
    const { userId, mileage, electricity, bikeId } = req.body;

    // Create a new instance of the Ridden model with the data
    const newRiddenInstance = await Ridden.create({
      userId,
      mileage,
      electricity,
      bikeId,
    });

    // Send a success response
    res.status(201).json(newRiddenInstance);
  } catch (error) {
    // If validation or database error occurs, send an error response
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
