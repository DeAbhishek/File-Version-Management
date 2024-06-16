/* eslint-disable no-undef */
const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
    default: new Date().toLocaleString(),
  },
  versions: {
    type: [
      {
        uploadDate: String,
        version: Number,
      },
    ],
    required: true,
    default: {
      uploadDate: new Date().toLocaleString(),
      version: 1,
    }
  },
});

const virtual = FormSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

FormSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  },
});

exports.Form = mongoose.model("Form", FormSchema);
