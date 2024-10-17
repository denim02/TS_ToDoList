import { useCallback, useMemo, useReducer } from "react";
import { useApi } from "./use-api";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const INITIAL_VALUES = {
  todos: [],
  isDataLoading: false,
  isApiProcessing: false,
  error: null,
};

const ACTION_TYPE = {
  TOGGLE_API_LOADING: "TOGGLE_API_LOADING",
  TOGGLE_DATA_LOADING: "TOGGLE_DATA_LOADING",
  SET_TODOS: "SET_TODOS",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_API_LOADING:
      return { ...state, isApiProcessing: !state.isApiProcessing };
    case ACTION_TYPE.TOGGLE_DATA_LOADING:
      return { ...state, isDataLoading: !state.isDataLoading };
    case ACTION_TYPE.SET_TODOS:
      return {
        ...state,
        todos: action.payload.data ?? [],
        error: action.payload.error,
        isDataLoading: false,
      };
    case ACTION_TYPE.ADD_TODO:
      return {
        ...state,
        todos: action.payload.data
          ? [...state.todos, action.payload.data]
          : [...state.todos],
        error: action.payload.error,
        isApiProcessing: false,
      };
    case ACTION_TYPE.UPDATE_TODO:
      return {
        ...state,
        todos: action.payload.data
          ? state.todos.map((todo) =>
              todo.id === action.payload.data.id ? action.payload.data : todo
            )
          : [...state.todos],
        error: action.payload.error,
        isApiProcessing: false,
      };
    case ACTION_TYPE.DELETE_TODO:
      return {
        ...state,
        todos: action.payload.error
          ? [...state.todos]
          : state.todos.filter((todo) => todo.id !== action.payload.id),
        error: action.payload.error,
        isApiProcessing: false,
      };
    default:
      throw new Error(`Unexpected action type: ${action.type}`);
  }
};

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, INITIAL_VALUES);
  const api = useApi(API_URL);

  const fetchTodos = useCallback(async () => {
    dispatch({ type: ACTION_TYPE.TOGGLE_DATA_LOADING });
    const apiResponse = await api.get();
    dispatch({ type: ACTION_TYPE.SET_TODOS, payload: apiResponse });
  }, [api]);

  const createTodo = useCallback(
    async (title, description) => {
      dispatch({ type: ACTION_TYPE.TOGGLE_API_LOADING });
      const apiResponse = await api.post("", { title, description });
      dispatch({ type: ACTION_TYPE.ADD_TODO, payload: apiResponse });
    },
    [api]
  );

  const updateTodo = useCallback(
    async (changedTodo) => {
      console.time("update");
      const originalTodo = state.todos.find(
        (todo) => todo.id === changedTodo.id
      );
      console.log(changedTodo, originalTodo);
      if (
        changedTodo.title !== originalTodo.title ||
        changedTodo.description !== originalTodo.description ||
        changedTodo.completed !== originalTodo.completed
      ) {
        dispatch({ type: ACTION_TYPE.TOGGLE_API_LOADING });
        const apiResponse = await api.patch(`/${changedTodo.id}`, changedTodo);
        dispatch({ type: ACTION_TYPE.UPDATE_TODO, payload: apiResponse });
      }
      console.timeEnd("update");
    },
    [api, state.todos]
  );

  const deleteTodo = useCallback(
    async (id) => {
      dispatch({ type: ACTION_TYPE.TOGGLE_API_LOADING });
      const apiResponse = await api.del(`/${id}`);
      dispatch({
        type: ACTION_TYPE.DELETE_TODO,
        payload: { id, error: apiResponse.error },
      });
    },
    [api]
  );

  const todoCompletedCount = useMemo(() => {
    return state.todos.filter((todo) => todo.completed).length;
  }, [state.todos]);

  const todoStats = useMemo(() => {
    console.log("Re-evaluating stats!");
    return {
      completed: todoCompletedCount,
      remaining: state.todos.length - todoCompletedCount,
    };
  }, [state.todos.length, todoCompletedCount]);

  return {
    ...state,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    todoStats,
  };
};
