/* eslint-disable no-undef */
const { Form } = require("../model/formModel");

exports.uploadFile = async (req, res) => {
  const formData = {
    name: req.body.name,
    type: req.body.type,
    location: req.body.location,
    file: req.file.originalname,
  };

  try {
    await Form.create(formData);
    res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await Form.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFile = async (req, res) => {
  let newFileName;

  if (req.file) {
    newFileName = req.file.originalname;
  }

  try {
    const doc = await Form.findByIdAndUpdate(
      req.params.id,
      {
        uploadDate: new Date().toLocaleString(),
        versions: req.body.versions,
        file: newFileName,
      },
      {
        new: true,
      }
    );
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
