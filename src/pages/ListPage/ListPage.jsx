import { useEffect, useMemo, useRef } from "react";
import useTodos from "../../hooks/use-todos";
import LoadingSpinner from "../../components/core/LoadingSpinner";
import TodoItem from "./TodoItem";
import { Search } from "lucide-react";
import InputField from "../../components/core/InputField";
import Button from "../../components/core/Button";
import { createSearchParams, useSearchParams } from "react-router-dom";

const ListPage = () => {
  const { todos, todoStats, fetchTodos, updateTodo, isDataLoading } =
    useTodos();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = useMemo(() => {
    return searchParams.has("keyword")
      ? todos.filter((todo) =>
          todo.title
            .toLowerCase()
            .includes(searchParams.get("keyword").toLowerCase())
        )
      : todos;
  }, [searchParams, todos]);

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  const handleSearch = () => {
    const keyword = searchRef.current.value;
    setSearchParams(createSearchParams({ keyword }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Your Todos</h1>
        <div className="text-sm text-gray-600">
          {todoStats.completed} completed / {todoStats.remaining} remaining
        </div>
      </div>

      <form>
        <div className="flex gap-x-5 items-end">
          <InputField
            name="keyword"
            label="Search"
            placeholder="Search todos..."
            className="h-10 rounded-md border border-gray-300 bg-white px-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            defaultValue={searchParams.get("keyword")}
            ref={searchRef}
          />
          <Button
            type="submit"
            handleClick={() => handleSearch()}
            className="text-white"
          >
            <Search />
          </Button>
        </div>
      </form>

      {searchParams.has("keyword") && (
        <div className="text-sm text-gray-600">
          Found {filteredTodos.length} matching &quot;
          {searchParams.get("keyword")}&quot;
        </div>
      )}

      {filteredTodos.length > 0 ? (
        <div className="grid gap-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleToggleCompleted={(todo) =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {searchParams.has("keyword")
              ? "No todos found matching your search."
              : "No todos yet. Create your first one!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ListPage;
