import PropTypes from "prop-types";

const Button = ({ label, handleClick, ...rest }) => {
  const { className, ...otherProps } = rest;

  return (
    <button
      onClick={handleClick}
      className={`base-button ${className}`}
      {...otherProps}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
