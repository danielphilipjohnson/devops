// require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./routes");

const {MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT} = require("./config/config");


// build timeout counter
const connectWithRetry = () => {
  mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("Successfully connected to DB")).catch((e) => {
    console.log(e);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// initialize express app
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());

// setup routes:
app.get("/", (req, res) => {
  return res.status(200).send("ok");
});

app.use("/api", api);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on ${port}`));
