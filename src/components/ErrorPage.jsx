import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">
        {error.statusText || error.message}
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
