import { useState } from "react";
import PropTypes from "prop-types";
import InputField from "./core/InputField";
import Button from "./core/Button";

const AddToDoForm = ({ handleAddTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) alert("New tasks must contain some text!");
    else {
      handleAddTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="add-to-do-form">
      <InputField
        name="todoText"
        label="Add a new To-Do:"
        placeholder="Enter anything..."
        type="text"
        value={input}
        handleChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit" label="Add" />
    </form>
  );
};

AddToDoForm.propTypes = {
  handleAddTodo: PropTypes.func.isRequired,
};

export default AddToDoForm;
