const express = require("express");
const router = express.Router();
const { Admin, Sequelize } = require("../models");
const yup = require("yup");

router.post("/", async (req, res) => {
  let data = req.body;
  // Validate request body
  let validationSchema = yup.object().shape({
    name : yup.string().trim().min(3).max(100).required(),
    password : yup.string().trim().min(8).max(128).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/).required(),
    email : yup.string().trim().email().required(),
    phone : yup.string().trim().matches(/^\d{8}$/).required(),
  });
  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errors: err.errors });
    return;
  }
  data.name = data.name.trim();
  data.password = data.password.trim();
  data.email = data.email.trim();
  data.phone = data.phone.trim();
  let result = await Admin.create(data);
  res.json(result);
});
router.get("/", async (req, res) => {
  let condition = {};
  let search = req.query.search;
  if (search) {
    condition[Sequelize.Op.or] = [
      { name: { [Sequelize.Op.like]: `%${search}%` } },
      { password: { [Sequelize.Op.like]: `%${search}%` } },
      { email: { [Sequelize.Op.like]: `%${search}%`} },
      { phone: { [Sequelize.Op.like]: `%${search}%`} },
    ];
  }
  let list = await Admin.findAll({
    where: condition,
    order: [["createdAt", "DESC"]],
  });
  res.json(list);
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let admin = await Admin.findByPk(id);
  // Check id not found
  if (!admin) {
    res.sendStatus(404);
    return;
  }
  res.json(admin);
});

router.put("/:id", async (req, res) => {
  let id = req.params.id;
  // Check id not found
  let admin = await Admin.findByPk(id);
  if (!admin) {
    res.sendStatus(404);
    return;
  }
  let data = req.body;
  // Validate request body
  let validationSchema = yup.object().shape({
    name : yup.string().trim().min(3).max(100).required(),
    password : yup.string().trim().min(8).max(128).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/).required(),
    email : yup.string().trim().email().required(),
    phone : yup.string().trim().matches(/^\d{8}$/).required(),
  });
  try {
    await validationSchema.validate(data, { abortEarly: false, strict: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errors: err.errors });
    return;
  }
  data.name = data.name.trim();
  data.password = data.password.trim();
  data.email = data.email.trim();
  data.phone = data.phone.trim();
  let num = await Admin.update(data, {
    where: { id: id },
  });
  if (num == 1) {
    res.json({
      message: "Admin was updated successfully.",
    });
  } else {
    res.status(400).json({
      message: `Cannot update admin with id ${id}.`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  // Check id not found
  let admin = await Admin.findByPk(id);
  if (!admin) {
    res.sendStatus(404);
    return;
  }
  let num = await Admin.destroy({
    where: { id: id },
  });
  if (num == 1) {
    res.json({
      message: "Admin was deleted successfully.",
    });
  } else {
    res.status(400).json({
      message: `Cannot delete admin with id ${id}.`,
    });
  }
});

module.exports = router;
