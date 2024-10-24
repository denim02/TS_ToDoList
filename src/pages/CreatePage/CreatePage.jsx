import { useNavigate } from "react-router-dom";
import useTodos from "../../hooks/use-todos";
import TodoForm from "../../components/common/TodoForm";

const CreatePage = () => {
  const { addTodo } = useTodos();
  const navigate = useNavigate();

  const handleSubmit = async (title, description) => {
    await addTodo(title, description);
    navigate("/todos");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Create New Todo</h1>
      <TodoForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePage;
