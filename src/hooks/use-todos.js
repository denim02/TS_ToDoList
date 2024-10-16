import { useCallback, useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isCrudProcessing, setIsCrudProcessing] = useState(false);
  const [error, setError] = useState(null);

  const getTodos = useCallback(async () => {
    setIsFetchingData(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error("An issue occured while fetching the todos.");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsFetchingData(false);
    }
  }, []);

  const createTodo = useCallback(async (title, description) => {
    setIsCrudProcessing(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (!response.ok)
        throw new Error("An issue occured while creating a todo.");
      const newTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsCrudProcessing(false);
    }
  }, []);

  const updateTodo = useCallback(async (changedTodo) => {
    setIsCrudProcessing(true);
    try {
      const { id, ...otherProps } = changedTodo;
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otherProps),
      });
      if (!response.ok)
        throw new Error("An issue occured while updating a todo.");
      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsCrudProcessing(false);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    setIsCrudProcessing(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("An issue occured while deleting a todo.");
      setTodos((prevTodos) =>
        prevTodos.toSpliced(
          prevTodos.findIndex((todo) => todo.id === id),
          1
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsCrudProcessing(false);
    }
  }, []);

  return {
    todos,
    isFetchingData,
    isCrudProcessing,
    error,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
