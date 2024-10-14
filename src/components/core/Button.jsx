import PropTypes from "prop-types";

const Button = ({ label, handleClick, ...rest }) => {
  return (
    <button onClick={handleClick} {...rest}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
