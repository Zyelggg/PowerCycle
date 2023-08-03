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
    // Validate the request body against the defined schema
    const validData = await schema.validate(req.body);

    // Create a new Ridden instance in the database
    const newRidden = await Ridden.create({
      userId: validData.userId,
      mileage: validData.mileage,
      electricity: validData.electricity,
      bikeId: validData.bikeId,
    });

    // Respond with the newly created Ridden instance
    res.status(201).json(newRidden);
  } catch (error) {
    // If validation or database insertion fails, handle the error
    res.status(400).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
      condition[Sequelize.Op.or] = [
          { stopname: { [Sequelize.Op.like]: `%${search}%` } }
      ];
  }

  let list = await Ridden.findAll({
      where: condition,
      order: [['createdAt', 'DESC']]
  });
  res.json(list);
});


module.exports = router;
