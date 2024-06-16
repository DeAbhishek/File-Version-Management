import axios from "axios";
import { useState } from "react";


const DocumentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Training",
    location: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Document Name is required";
    if (!formData.location)
      formErrors.location = "Document Location is required";
    if (!formData.file) formErrors.file = "File Attachment is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newDocument = {
        ...formData,
        uploadDate: new Date().toLocaleString(),
        version: 1,
      };
      console.log(newDocument)

      await axios.post("http://localhost:5000/file/upload-file", newDocument, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        
      console.log(newDocument);
      setFormData({
        name: "",
        type: "Training",
        location: "",
        file: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Document Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 p-2 border rounded w-full ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Document Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 p-2 border rounded w-full border-gray-300"
        >
          <option>Training</option>
          <option>Certificate</option>
          <option>Manual</option>
          <option>License</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Document Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 p-2 border rounded w-full ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">File Attachment</label>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className={`mt-1 p-2 border rounded w-full ${
            errors.file ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload Document
      </button>
    </form>
  );
};

export default DocumentForm;
