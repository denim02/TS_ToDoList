import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTodos from "../../hooks/use-todos";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

const DetailsPage = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const { fetchTodo } = useTodos();

  useEffect(() => {
    fetchTodo(id).then((data) => setTodo(data));
  }, [id, fetchTodo]);

  if (!todo) return <p>No todo yet.</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/todos"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Todos
        </Link>

        <div className="flex gap-2">
          <Link
            to={`/todos/${todo.id}/edit`}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Edit Todo
          </Link>
          <Link
            to={`/todos/${todo.id}/delete`}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Status Banner */}
        <div
          className={`px-6 py-3 flex items-center gap-2 border-b ${
            todo.completed
              ? "bg-green-50 border-green-100 text-green-700"
              : "bg-blue-50 border-blue-100 text-blue-700"
          }`}
        >
          {todo.completed ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Completed</span>
            </>
          ) : (
            <>
              <Clock className="h-5 w-5" />
              <span className="font-medium">In Progress</span>
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {todo.title}
          </h1>

          <div className="prose max-w-none text-gray-600 mb-6">
            <p className="whitespace-pre-wrap">{todo.description}</p>
          </div>

          {/* Metadata */}
          <div className="border-t pt-4 mt-6">
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">
                  {todo.id}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
