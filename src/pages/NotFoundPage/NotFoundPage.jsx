import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
