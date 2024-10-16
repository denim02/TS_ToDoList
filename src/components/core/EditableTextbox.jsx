import PropTypes from "prop-types";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const EditableTextbox = forwardRef(function EditableTextbox(
  { name, value, isEditable, shouldAutoresize, handleChange, ...rest },
  outerRef
) {
  const { className, ...otherProps } = rest;
  const textAreaRef = useRef(null);

  useImperativeHandle(outerRef, () => textAreaRef.current, []);

  const adjustHeight = () => {
    textAreaRef.current.style.height = "inherit";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleTextboxChange = (event) => {
    if (shouldAutoresize) adjustHeight();
    handleChange(event);
  };

  useEffect(() => {
    if (shouldAutoresize) adjustHeight();
  }, [shouldAutoresize]);

  return (
    <textarea
      className={`editable-textbox ${
        isEditable ? "editable" : "non-editable"
      } ${className}`}
      name={name}
      readOnly={!isEditable}
      value={value}
      onChange={handleTextboxChange}
      ref={textAreaRef}
      {...otherProps}
    ></textarea>
  );
});

EditableTextbox.propTypes = {
  name: PropTypes.string,
  isEditable: PropTypes.bool,
  shouldAutoresize: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EditableTextbox;
