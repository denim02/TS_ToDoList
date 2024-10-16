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
    todoStats,
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
      {isFetchingData && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {todos && (
        <>
          <div className="todo-list-stats">
            <h4>Completed: {todoStats.completed}</h4>
            <h4>Remaining: {todoStats.remaining}</h4>
          </div>
          <div className="todo-list">
            {todos.map((todo) => (
              <ToDoCard
                key={todo.id}
                todo={todo}
                handleEditTodo={updateTodo}
                handleRemoveTodo={deleteTodo}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
}

export default App;
