import PropTypes from "prop-types";

const EditableTextbox = ({
  name,
  value,
  isEditable,
  handleChange,
  ...rest
}) => {
  const { className, ...otherProps } = rest;

  return (
    <textarea
      className={`editable-textbox ${
        isEditable ? "editable" : "non-editable"
      } ${className}`}
      name={name}
      readOnly={!isEditable}
      value={value}
      onChange={handleChange}
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
