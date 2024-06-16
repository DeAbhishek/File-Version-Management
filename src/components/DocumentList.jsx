import axios from "axios";
import { useEffect, useState } from "react";

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/file/").then((response) => {
      setDocuments(response.data);
    });
  }, []);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Document List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Document Name</th>
            <th className="py-2">Document Type</th>
            <th className="py-2">Document Location</th>
            <th className="py-2">Upload Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="text-center">
              <td className="py-2 border-t">{doc.name}</td>
              <td className="py-2 border-t">{doc.type}</td>
              <td className="py-2 border-t">{doc.location}</td>
              <td className="py-2 border-t">{doc.uploadDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentList;
