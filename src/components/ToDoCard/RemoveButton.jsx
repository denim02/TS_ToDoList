import PropTypes from "prop-types";
import IconButton from "../core/IconButton";
import { FaTrash } from "react-icons/fa";

const RemoveButton = ({ handleClick }) => {
  return (
    <IconButton
      handleClick={handleClick}
      icon={FaTrash}
      className="remove-button"
    />
  );
};

RemoveButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default RemoveButton;
