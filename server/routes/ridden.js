const express = require('express');
const router = express.Router();
const { Ridden, Sequelize } = require('../models');
const yup = require('yup');


// Define the POST route for creating a new Ridden instance
router.post("/", async (req, res) => {
  
    // Validate the request body against the defined schema
    let data = req.body;

    // Create a new Ridden instance in the database
    const newRidden = await Ridden.create({
      userId: data.userId,
      duration: data.duration,
      mileage: data.mileage,
      electricity: data.electricity,
      serialno: data.serialno,

    });
    
    // Respond with the newly created Ridden instance
    res.status(201).json(newRidden);
  
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
