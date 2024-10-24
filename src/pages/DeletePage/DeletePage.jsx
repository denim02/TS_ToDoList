import { Link, useNavigate, useParams } from "react-router-dom";
import useTodos from "../../hooks/use-todos";

const DeletePage = () => {
  const { id } = useParams();
  const { deleteTodo } = useTodos();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteTodo(id);
    navigate("/todos");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
        <div className="flex">
          <div>
            <h3 className="text-lg font-medium text-red-800">
              Are you sure you want to delete this todo?
            </h3>
            <p className="mt-2 text-red-700">
              This action cannot be undone. This will permanently delete your
              todo.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Link
          to="/todos"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePage;
