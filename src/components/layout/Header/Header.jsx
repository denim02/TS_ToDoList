import { List, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          To-Do App
        </Link>
        <div className="flex gap-2">
          <Link
            to="/todos"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <List className="mr-2 h-4 w-4" />
            View Todos
          </Link>
          <Link
            to="/todos/create"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Todo
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
