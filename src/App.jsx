// import { useState } from "react";
import Root from "./components/Root"
import ErrorPage from "./components/ErrorPage"
import DocumentForm from "./components/DocumentForm";
import DocumentList from "./components/DocumentList";
import DocumentVersion from "./components/DocumentVersion";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  // const [documents, setDocuments] = useState([]);

  // const addDocument = (newDocument) => {
  //   setDocuments([...documents, newDocument]);
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <DocumentForm />,
        },
        {
          path: "list",
          element: <DocumentList />,
        },
        {
          path: "version",
          element: <DocumentVersion />,
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
