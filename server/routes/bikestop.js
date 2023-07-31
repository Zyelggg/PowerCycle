const express = require('express');
const router = express.Router();
const { BikeStop, Sequelize } = require('../models');

const yup = require("yup");
router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        stopname: yup.string().trim().min(3).max(100).required(),
        coordx: yup.number().required(),
        coordy: yup.number().required()
        
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.stopname = data.stopname.trim();
    let result = await BikeStop.create(data);
    res.json(result);
});

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
        condition[Sequelize.Op.or] = [
            { stopname: { [Sequelize.Op.like]: `%${search}%` } }
        ];
    }

    let list = await BikeStop.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let bikestop = await BikeStop.findByPk(id);
    // Check id not found
    if (!bikestop) {
        res.sendStatus(404);
        return;
    }
    res.json(bikestop);
});

// Update Bike
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let num = await BikeStop.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Bikestop was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update bikestop with id ${id}.`
        });
    }
});

// DELETE Bike
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await BikeStop.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Bikestop was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot remove bikestop with id ${id}.`
        });
    }
});

module.exports = router;