const express = require('express');
const cors = require('cors');
const passport = require("passport");
const expressSession = require("express-session");

// const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
require('dotenv').config();

const app = express();
app.use(passport.initialize())
app.use(passport.session())

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(expressSession({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});
app.use("/auth", authRoute);
// Routes
const bikeRoute = require('./routes/bike');
app.use("/bike", bikeRoute);

const bikestopRoute = require('./routes/bikestop');
app.use("/bikestop", bikestopRoute);

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

const userRoute = require('./routes/user');
app.use("/user", userRoute);

//models seq
const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});