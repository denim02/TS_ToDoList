import PropTypes from "prop-types";
import RemoveButton from "./RemoveButton";
import EditableTextbox from "../core/EditableTextbox";
import { useState } from "react";
import SaveButton from "./SaveButton";
import EditButton from "./EditButton";

const ToDoCard = ({ todo, handleRemoveTodo, handleEditTodo }) => {
  const [todoContent, setTodoContent] = useState(todo.description);
  const [isContentEditable, setIsContentEditable] = useState(false);

  const handleStartEdit = () => setIsContentEditable(true);
  const handleFinishEdit = () => {
    if (!todoContent.trim()) alert("The content of a task cannot be empty!");
    else {
      todo.description = todoContent;
      handleEditTodo(todo);
      setIsContentEditable(false);
    }
  };

  const handleToggleCompleted = () => {
    todo.completed = !todo.completed;
    handleEditTodo(todo);
  };

  return (
    <div className={`todo-card ${todo.completed && "completed"}`}>
      <div className="todo-header">
        <div>
          <h4>Task #{todo.id}</h4>
          <h3>{todo.title}</h3>
        </div>
        <input
          type="checkbox"
          onChange={handleToggleCompleted}
          name="isCompleted"
          checked={todo.completed}
        />
      </div>
      <hr />
      <div className="todo-content">
        <EditableTextbox
          isEditable={isContentEditable}
          value={todoContent}
          className="todo-text"
          handleChange={(e) => setTodoContent(e.target.value)}
        />
        <div className="todo-actions">
          {isContentEditable ? (
            <SaveButton handleClick={handleFinishEdit} />
          ) : (
            <EditButton handleClick={handleStartEdit} />
          )}
          <RemoveButton handleClick={() => handleRemoveTodo(todo.id)} />
        </div>
      </div>
    </div>
  );
};

ToDoCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};

export default ToDoCard;
