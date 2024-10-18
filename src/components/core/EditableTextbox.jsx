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
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
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
      onChange={handleChange}
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
