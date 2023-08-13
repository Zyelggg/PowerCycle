const express = require('express');
const cors = require('cors');

const authRoute = require("./routes/auth");
require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
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

const rewardRoute = require('./routes/reward');
app.use("/reward", rewardRoute)

const userRoute = require('./routes/user');
app.use("/user", userRoute);

const feedbackRoute = require('./routes/feedback');
app.use("/feedback", feedbackRoute);

const riddenRoute = require('./routes/ridden');
app.use("/ridden", riddenRoute);

const stripeRoute = require('./routes/stripe');
app.use("/stripe", stripeRoute);

//models seq
const db = require('./models');
db.sequelize.sync({ alter: true }).then(() => {
    let port = process.env.APP_PORT;
    app.listen(port, () => {
        console.log(`⚡ Sever running on http://localhost:${port}`);
    });
});