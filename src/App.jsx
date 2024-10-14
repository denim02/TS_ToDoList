import { useRef, useState } from "react";
import "./App.css";
import AddToDoForm from "./components/AddToDoForm";
import Card from "./components/core/Card";
import ToDoCard from "./components/ToDoCard";

function App() {
  const lastUsedId = useRef(1);
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (todoText) => {
    lastUsedId.current++;
    setTodos((todos) => [
      ...todos,
      {
        id: lastUsedId.current - 1,
        text: todoText.trim(),
        createdAt: new Date(),
      },
    ]);
  };

  const handleRemoveTodo = (todoId) => {
    setTodos((todos) => todos.filter((t) => t.id !== todoId));
  };

  const handleEditTodo = (todoId, newContent) => {
    setTodos((todos) =>
      todos.map((t) =>
        t.id === todoId ? { text: newContent.trim(), ...t } : t
      )
    );
  };

  return (
    <Card>
      <h1>To-Do Project</h1>
      <AddToDoForm handleAddTodo={handleAddTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <ToDoCard
            key={todo.id}
            todo={todo}
            handleEditTodo={handleEditTodo}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}
      </div>
    </Card>
  );
}

export default App;
