import { useNavigate, useParams } from "react-router-dom";
import useTodos from "../../hooks/use-todos";
import TodoForm from "../../components/common/TodoForm";
import { useEffect, useState } from "react";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTodo, updateTodo } = useTodos();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetchTodo(id).then((data) => setTodo(data));
  }, [id, fetchTodo]);

  const handleSubmit = async (title, description) => {
    await updateTodo({ ...todo, title: title, description: description });
    navigate("/todos");
  };

  if (!todo) return <div className="text-gray-600">Todo not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Edit Todo</h1>
      <TodoForm defaultValues={todo} handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditPage;
