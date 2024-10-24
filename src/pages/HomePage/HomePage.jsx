import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Welcome to Todo App
      </h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
        </p>
        <Link
          to="/todos"
          className="inline-block px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          View existing to-dos
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
