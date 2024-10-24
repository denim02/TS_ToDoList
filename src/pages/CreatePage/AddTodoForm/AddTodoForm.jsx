import PropTypes from "prop-types";
import { memo } from "react";
import { useInput } from "../../../hooks/use-input";
import Button from "../../../components/core/Button";
import InputField from "../../../components/core/InputField";

const validateTitle = (title) => {
  if (title.trim() === "") return "Title is required!";
  return null;
};

const validateDescription = (description) => {
  if (description.trim() === "") return "Description is required!";
  return null;
};

const AddTodoForm = ({ handleSubmit }) => {
  const titleInput = useInput("", validateTitle);
  const descriptionInput = useInput("", validateDescription);

  const processSubmit = (e) => {
    e.preventDefault();
    if (titleInput.error || descriptionInput.error) return;

    handleSubmit(titleInput.value, descriptionInput.value);

    // Reset form
    handleClear();
  };

  const handleClear = () => {
    titleInput.clearInput();
    descriptionInput.clearInput();
  };

  return (
    <form
      onSubmit={processSubmit}
      className="bg-white rounded-lg shadow-sm border p-6 space-y-4"
    >
      <div className="space-y-10">
        <InputField
          name="title"
          label="Title:"
          placeholder="Enter a title..."
          value={titleInput.value}
          required
          handleChange={titleInput.handleChange}
          ref={titleInput.ref}
          error={titleInput.error}
        />
        <InputField
          name="description"
          label="Description:"
          placeholder="Enter anything..."
          value={descriptionInput.value}
          required
          handleChange={descriptionInput.handleChange}
          ref={descriptionInput.ref}
          error={descriptionInput.error}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="submit"
          label="Add Todo"
          disabled={titleInput.error || descriptionInput.error}
        />
        <Button
          label="Clear"
          type="reset"
          onClick={handleClear}
          disabled={!titleInput.value && !descriptionInput.value}
        />
      </div>
    </form>
  );
};

AddTodoForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(AddTodoForm);
