import { Check, Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, handleToggleCompleted }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => handleToggleCompleted(todo)}
          className={`p-1 rounded-md ${
            todo.completed
              ? "bg-green-100 text-green-600 hover:bg-green-200"
              : "border border-gray-300 hover:bg-gray-100"
          }`}
        >
          <Check className="h-4 w-4" />
        </button>
        <h2
          className={`text-lg font-semibold ${
            todo.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {todo.title}
        </h2>
      </div>
      <p className="text-gray-600 mb-4">{todo.description}</p>
      <div className="flex justify-end gap-2">
        <Link
          to={`/todos/${todo.id}`}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          View
        </Link>
        <Link
          to={`/todos/${todo.id}/edit`}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Link>
        <Link
          to={`/todos/${todo.id}/delete`}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Link>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleToggleCompleted: PropTypes.func.isRequired,
};

export default memo(TodoItem);
