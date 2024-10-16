import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import EditableTextbox from "../core/EditableTextbox";
import { useState, memo } from "react";
import SaveButton from "./SaveButton";
import EditButton from "./EditButton";
import { useInput } from "../../hooks/use-input";

const TodoItem = ({ todo, handleDeleteTodo, handleUpdateTodo }) => {
  const titleInput = useInput(todo.title);
  const descriptionInput = useInput(todo.description);
  const [isContentEditable, setIsContentEditable] = useState(false);

  const handleStartEdit = () => setIsContentEditable(true);
  const handleFinishEdit = () => {
    handleUpdateTodo({
      ...todo,
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
    });
    setIsContentEditable(false);
  };

  const handleToggleCompleted = () => {
    handleUpdateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <div className={`todo-card ${todo.completed && "completed"}`}>
      <div className="todo-header">
        <div>
          <h4>Task #{todo.id}</h4>
          <EditableTextbox
            isEditable={isContentEditable}
            value={titleInput.value}
            className="todo-title"
            shouldAutoresize={true}
            handleChange={titleInput.handleChange}
            ref={titleInput.ref}
          />
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
          value={descriptionInput.value}
          className="todo-text"
          shouldAutoresize={true}
          handleChange={descriptionInput.handleChange}
          ref={descriptionInput.ref}
        />
        <div className="todo-actions">
          {isContentEditable ? (
            <SaveButton handleClick={handleFinishEdit} />
          ) : (
            <EditButton handleClick={handleStartEdit} />
          )}
          <DeleteButton handleClick={() => handleDeleteTodo(todo.id)} />
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleDeleteTodo: PropTypes.func.isRequired,
  handleUpdateTodo: PropTypes.func.isRequired,
};

export default memo(TodoItem);
