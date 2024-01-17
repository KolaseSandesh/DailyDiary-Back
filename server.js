require("dotenv").config();
const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true}).then(
  () => {
    console.log("Connected to db...");
  },
  (err) => {
    console.log("Something went wrong..." + err);
  }
);

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Daily Diary");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
