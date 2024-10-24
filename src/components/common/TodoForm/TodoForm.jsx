import PropTypes from "prop-types";
import { memo, useRef } from "react";
import Button from "../../../components/core/Button";
import InputField from "../../../components/core/InputField";

const TodoForm = ({
  defaultValues = { title: "", description: "" },
  handleSubmit,
}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();

  const processSubmit = (e) => {
    e.preventDefault();
    handleSubmit(titleRef.current.value, descriptionRef.current.value);
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
          required
          defaultValue={defaultValues.title}
          ref={titleRef}
        />
        <InputField
          name="description"
          label="Description:"
          placeholder="Enter anything..."
          required
          defaultValue={defaultValues.description}
          ref={descriptionRef}
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" label="Add Todo" />
        <Button type="reset" label="Clear" />
      </div>
    </form>
  );
};

TodoForm.propTypes = {
  defaultValues: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(TodoForm);
