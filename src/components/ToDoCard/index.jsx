import PropTypes from "prop-types";
import RemoveButton from "./RemoveButton";
import EditableTextbox from "../core/EditableTextbox";
import { useState } from "react";
import SaveButton from "./SaveButton";
import EditButton from "./EditButton";

const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const ToDoCard = ({ todo, handleRemoveTodo, handleEditTodo }) => {
  const [todoContent, setTodoContent] = useState(todo.text);
  const [isContentEditable, setIsContentEditable] = useState(false);

  const handleStartEdit = () => setIsContentEditable(true);
  const handleFinishEdit = () => {
    if (!todoContent.trim()) alert("The content of a task cannot be empty!");
    else {
      handleEditTodo(todo.id, todoContent);
      setIsContentEditable(false);
    }
  };

  return (
    <div className="todo-card">
      <div className="todo-header">
        <h3>Task #{todo.id}</h3>
        <p>{todo.createdAt.toLocaleDateString("en-uk", dateFormatOptions)}</p>
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
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date),
  }).isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};

export default ToDoCard;
