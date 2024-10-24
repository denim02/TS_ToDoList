import PropTypes from "prop-types";
import React from "react";

const InputField = React.forwardRef(function InputField(
  { name, value, defaultValue, label, handleChange, id, ...rest },
  ref
) {
  const { error, ...inputProps } = rest;

  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={id ?? name}
      >
        {label}
      </label>
      <input
        name={name}
        id={id ?? name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ref={ref}
        {...inputProps}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
});

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  id: PropTypes.string,
};

export default InputField;
