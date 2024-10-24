import { useEffect } from "react";
import useTodos from "../../hooks/use-todos";
import LoadingSpinner from "../../components/core/LoadingSpinner";
import TodoItem from "./TodoItem";

const ListPage = () => {
  const { todos, todoStats, fetchTodos, updateTodo, isDataLoading } =
    useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Todos</h1>
        <div className="text-sm text-gray-600">
          {todoStats.completed} completed / {todoStats.remaining} remaining
        </div>
      </div>
      <div className="grid gap-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleCompleted={(todo) =>
              updateTodo({ ...todo, completed: !todo.completed })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
