import AddTodoForm from "./AddTodoForm";
import { useEffect } from "react";
import TodoList from "./TodoList";
import TodoStats from "./TodoStats";
import { useTodos } from "../hooks/use-todos";

const TodoContainer = () => {
  const {
    todos,
    isDataLoading,
    error,
    todoStats,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      <AddTodoForm handleAddTodo={addTodo} />
      {isDataLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {todos && (
        <>
          <TodoStats
            completed={todoStats.completed}
            remaining={todoStats.remaining}
          />
          <TodoList
            todos={todos}
            handleUpdateTodo={updateTodo}
            handleDeleteTodo={deleteTodo}
          />
        </>
      )}
    </>
  );
};

export default TodoContainer;
