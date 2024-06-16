/* eslint-disable no-undef */
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

// for parsing the json data
app.use(express.json());

const mongoose = require("mongoose");

// connect to database
main().catch((err) => {
  console.error(err);
});

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected to MongoDB");
}

app.listen(process.env.PORT, () =>
  console.log("Server listening on port 5000")
);

app.get("/", (req, res) =>res.send("Welcome"))


// MULTER
const multer = require("multer");

const formRouter = require("./routes/formRouter");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/file", upload.single("file"), formRouter);

