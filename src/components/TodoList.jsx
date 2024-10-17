import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
