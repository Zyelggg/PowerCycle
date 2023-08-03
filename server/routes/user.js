const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const yup = require("yup");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/auth');
require('dotenv').config();

router.get("/", async (req, res) => {
    let condition = {};
    let search = req.query.search;
    if (search) {
      condition[Sequelize.Op.or] = [
        { name: { [Sequelize.Op.like]: `%${search}%` } },
        { email: { [Sequelize.Op.like]: `%${search}%` } },
      ];
    }
    let list = await User.findAll({
      where: condition,
      order: [["createdAt", "DESC"]],
    });
    res.json(list);
  });
  

router.post("/register",async (req,res)=>{
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required(),
        phone: yup.string().trim().min(8).max(8).required(),
        
    })
    console.log("here")
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    data.phone = data.phone.trim();
    data.userid = data.id;

    // Check email
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (user) {
        res.status(400).json({ message: "Email already exists." });
        return;
    }
    let user_phone = await User.findOne({
        where: { phone: data.phone }
    });
    if (user_phone) {
        res.status(400).json({ message: "Phone number already exists." });
        return;
    };
    res.json(data)
})


router.post("/verification", async (req, res) => {
    let data = req.body;
    // Hash passowrd
    data.password = await bcrypt.hash(data.password, 10);
    // Create user
    let result = await User.create(data);
    res.json(result);
});

router.post("/login", async (req, res) => {
    let data = req.body;
    // Validate request body
    let validationSchema = yup.object().shape({
        email: yup.string().trim().email().max(50).required(),
        password: yup.string().trim().min(8).max(50).required()
    })
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        res.status(400).json({ errors: err.errors });
        return;
    }

    // Trim string values
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();

    // Check email and password
    let errorMsg = "Email or password is not correct.";
    let user = await User.findOne({
        where: { email: data.email }
    });
    if (!user) {
        res.status(400).json({ message: errorMsg });
        return;
    }
    let match = await bcrypt.compare(data.password, user.password);
    if (!match) {
        res.status(400).json({ message: errorMsg });
        return;
    }

    // Return user info
    let userInfo = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET,
        { expiresIn: '30d' });
    res.json({
        accessToken: accessToken,
        user: userInfo
    });
});

router.get("/auth", validateToken, (req, res) => {
    let userInfo = {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        
    };
    res.json({
        user: userInfo,
        userid: req.user.id,
        useremail:req.user.email
    });
});

router.get("/userdetails/:id", async (req, res) => {
    let id = req.params.id;
    let userdetail = await User.findByPk(id)
    res.json(userdetail)
})
router.get("/securitydetails/:id", async (req, res) => {
    let id = req.params.id;
    let userdetail = await User.findByPk(id)
    res.json(userdetail)
})
router.put("/userdetails/:id", async (req, res) => {
    let id = req.params.id;
    //1
    // Check id not found
    let details = await User.findByPk(id);
    if (!details) {
        res.sendStatus(404);
        return;
    }
    
    // Check request user id
    // let userId = req.user.id;
    if (details.id != id) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    console.log(data)
    // Validate request body
    let validationSchema = yup.object().shape({
        name: yup.string().trim().matches(/^[a-z ,.'-]+$/i)
            .min(3).max(50).required(),
        email: yup.string().trim().email().max(50).required(),
        phone: yup.string().trim().min(8).max(8).required(),
    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.name = data.name.trim();
    data.email = data.email.trim().toLowerCase();
    data.password = data.password.trim();
    data.phone = data.phone.trim();
    let num = await User.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Detail was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update Detail with id ${id}.`
        });
    }
});

router.put("/securitydetails/:id", async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let details = await User.findByPk(id);
    if (!details) {
        res.sendStatus(404);
        return;
    }
    
    // Check request user id
    // let userId = req.user.id;
    if (details.id != id) {
        res.sendStatus(403);
        return;
    }

    let data = req.body;
    console.log(data)
    // Validate request body
    let validationSchema = yup.object().shape({
        password: yup.string().trim().min(8).max(50).required(),

    });
    try {
        await validationSchema.validate(data,
            { abortEarly: false, strict: true });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    data.password = data.password.trim();
    data.password = await bcrypt.hash(data.password, 10);
    console.log(details.password)
    console.log(data.password)
    if (data.password == details.password) {
        res.status(400).json({
            message: "Password cannot be the same as your current one"
        });
        return;
    }
    let num = await User.update(data, {
        where: { id: id }
    });
    if (num == 1) {
        res.json({
            message: "Detail was updated successfully."
        });
    }
    else {
        res.status(400).json({
            message: `Cannot update Detail with id ${id}.`
        });
    }
});

router.delete("/:id", validateToken, async (req, res) => {
    let id = req.params.id;
    // Check id not found
    let user = await User.findByPk(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }

    // Check request user id
    
    if (user.id != id) {
        res.sendStatus(403);
        return;
    }

    let num = await User.destroy({
        where: { id: id }
    })
    if (num == 1) {
        res.json({
            message: "Tutorial was deleted successfully."
        });
    }

});
module.exports = router;
