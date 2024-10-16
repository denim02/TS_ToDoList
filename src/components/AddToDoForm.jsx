import InputField from "./core/InputField";
import PropTypes from "prop-types";
import Button from "./core/Button";
import { useInput } from "../hooks/use-input";

const AddToDoForm = ({ handleAddTodo }) => {
  const titleInput = useInput();
  const descriptionInput = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodo(titleInput.value, descriptionInput.value);

    // Reset form
    titleInput.clearInput();
    descriptionInput.clearInput();
  };

  return (
    <form onSubmit={handleSubmit} id="add-to-do-form">
      <div>
        <InputField
          name="title"
          label="Title:"
          placeholder="Enter a title..."
          value={titleInput.value}
          required
          handleChange={titleInput.handleChange}
          ref={titleInput.ref}
        />
        <InputField
          name="description"
          label="Description:"
          placeholder="Enter anything..."
          value={descriptionInput.value}
          required
          handleChange={descriptionInput.handleChange}
          ref={descriptionInput.ref}
        />
      </div>
      <Button type="submit" label="Add" />
    </form>
  );
};

AddToDoForm.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};

export default AddToDoForm;
