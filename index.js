const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
require("dotenv").config();

/**
 * Database setup
 */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("conectado ao mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./src/routes"));

app.listen(process.env.PORT, (_) => {
  console.log("server subiu ok");
});
