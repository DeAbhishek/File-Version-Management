/* eslint-disable no-undef */
const {
  uploadFile,
  getAllFiles,
  updateFile,
} = require("../controller/formController");

const route = require("express").Router();

route
  .post("/upload-file", uploadFile)
  .get("/", getAllFiles)
  .patch("/:id", updateFile);

module.exports = route;
