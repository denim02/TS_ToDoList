import PropTypes from "prop-types";
import { useRef } from "react";

const EditableTextbox = ({
  name,
  value,
  isEditable,
  handleChange,
  ...rest
}) => {
  const { className, ...otherProps } = rest;
  const textAreaRef = useRef(null);

  const adjustHeight = () => {
    textAreaRef.current.style.height = "inherit";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleTextboxChange = (event) => {
    adjustHeight();
    handleChange(event);
  };

  return (
    <textarea
      className={`editable-textbox ${
        isEditable ? "editable" : "non-editable"
      } ${className}`}
      name={name}
      readOnly={!isEditable}
      value={value}
      onChange={handleTextboxChange}
      rows={3}
      {...otherProps}
    ></textarea>
  );
};

EditableTextbox.propTypes = {
  name: PropTypes.string,
  isEditable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EditableTextbox;
