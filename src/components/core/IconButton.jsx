import PropTypes from "prop-types";
import { IconContext } from "react-icons";

const IconButton = ({ icon: Icon, handleClick, ...rest }) => {
  const { className, ...otherProps } = rest;

  return (
    <button onClick={handleClick} className="icon-button" {...otherProps}>
      <IconContext.Provider value={{ className: `icon-styles ${className}` }}>
        <Icon />
      </IconContext.Provider>
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IconButton;
