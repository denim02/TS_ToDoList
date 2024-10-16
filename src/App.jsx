import { useEffect } from "react";
import "./App.css";
import AddToDoForm from "./components/AddToDoForm";
import Card from "./components/core/Card";
import ToDoCard from "./components/ToDoCard";
import { useTodos } from "./hooks/use-todos";

function App() {
  const {
    todos,
    isFetchingData,
    error,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <Card>
      <h1>To-Do Project</h1>
      <AddToDoForm handleAddTodo={createTodo} />
      <div className="todo-list">
        {isFetchingData && <p>Loading data...</p>}
        {error && <p>Error: {error}</p>}
        {todos &&
          todos.map((todo) => (
            <ToDoCard
              key={todo.id}
              todo={todo}
              handleEditTodo={updateTodo}
              handleRemoveTodo={deleteTodo}
            />
          ))}
      </div>
    </Card>
  );
}

export default App;
