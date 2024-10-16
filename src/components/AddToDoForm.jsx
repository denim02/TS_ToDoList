import { useState } from "react";
import InputField from "./core/InputField";
import PropTypes from "prop-types";
import Button from "./core/Button";

const AddToDoForm = ({ handleAddTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) alert("A new to-do must contain a title!");
    else if (!description.trim())
      alert("A new to-do must contain a description!");
    else {
      handleAddTodo(title.trim(), description.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-to-do-form">
      <div>
        <InputField
          name="title"
          label="Title:"
          placeholder="Enter a title..."
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          name="description"
          label="Description"
          placeholder="Enter anything..."
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
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
