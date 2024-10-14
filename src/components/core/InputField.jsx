import PropTypes from "prop-types";

const InputField = ({ name, value, label, handleChange, id, ...rest }) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        id={id ?? name}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default InputField;
