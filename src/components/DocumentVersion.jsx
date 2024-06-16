/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const DocumentVersion = () => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [file, setFile] = useState(null);
  const [versionsArr, setVersionsArr] = useState([]);
  const [setselectedDocId, setSetselectedDocId] = useState("");
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/file/").then((response) => {
      setDocuments(response.data);
    });
  }, []);

  const handleSelectChange = (e) => {
    setSelectedDocument(e.target.value);

    const selectedDocVersions = documents.filter(
      (doc) => doc.name === e.target.value
    );
    setVersionsArr(selectedDocVersions[0].versions);
    setSetselectedDocId(selectedDocVersions[0].id);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVersionSubmit = async (e) => {
    e.preventDefault();
    setVersionsArr([]);
    if (selectedDocument && file) {
      const newVersion = {
        file: file,
        versions: [
          ...versionsArr,
          {
            version: versionsArr.length + 1,
            uploadDate: new Date().toLocaleString(),
          },
        ],
      };
      const updateResult = await axios.patch(
        `http://localhost:5000/file/${setselectedDocId}`,
        newVersion,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVersionsArr(updateResult.data.versions);

      setFile(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Document Versioning</h2>
      <form onSubmit={handleVersionSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Document Name</label>
          <select
            value={selectedDocument}
            onChange={handleSelectChange}
            className="mt-1 p-2 border rounded w-full border-gray-300"
          >
            <option value="">Select a document</option>
            {documents.map((doc, index) => (
              <option key={index} value={doc.name}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">File Attachment</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload New Version
        </button>
      </form>

      {versionsArr.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-2">Version History</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Version</th>
                <th className="py-2">Upload Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {versionsArr.map((version) => (
                <tr key={version.id} className="text-center">
                  <td className="py-2 border-t">Version {version.version}</td>
                  <td className="py-2 border-t">{version.uploadDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        selectedDocument && <div>Loading...</div>
      )}
    </div>
  );
};

export default DocumentVersion;
