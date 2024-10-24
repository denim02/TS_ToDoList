import PropTypes from "prop-types";

const Button = ({ label, children, handleClick, ...rest }) => {
  const { className, type, ...otherProps } = rest;

  const renderedClassName = `${
    type === "submit"
      ? "px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      : type === "reset"
      ? "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      : ""
  } ${className}`;

  return (
    <button
      onClick={handleClick}
      type={type || "button"}
      className={renderedClassName}
      {...otherProps}
    >
      {label || children}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};

export default Button;
