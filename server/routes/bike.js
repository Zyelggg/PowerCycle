const express = require('express');
const router = express.Router();
const { Bike, Sequelize } = require('../models');

const yup = require("yup");

router.post("/", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        stopname: yup.string().required(),
        repairs: yup.bool().required()
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
    let result = await Bike.create(data);
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

    let list = await Bike.findAll({
        where: condition,
        order: [['createdAt', 'DESC']]
    });
    res.json(list);
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    let bike = await Bike.findByPk(id);
    // Check id not found
    if (!bike) {
        res.sendStatus(404);
        return;
    }
    res.json(bike);
});

// Update Bike
router.put("/:id", async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let num = await Bike.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Bike was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update bike with id ${id}.`
        });
    }
});


// DELETE Bike
router.delete("/:id", async (req, res) => {
    let id = req.params.id;
    let num = await Bike.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Bike was deleted successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot remove bike with id ${id}.`
        });
    }
});

module.exports = router;