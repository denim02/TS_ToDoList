import PropTypes from "prop-types";
import IconButton from "../core/IconButton";
import { FaSave } from "react-icons/fa";

const SaveButton = ({ handleClick }) => {
  return (
    <IconButton
      handleClick={handleClick}
      icon={FaSave}
      className="save-button"
    />
  );
};

SaveButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SaveButton;
