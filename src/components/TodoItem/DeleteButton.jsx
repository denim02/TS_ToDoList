import PropTypes from "prop-types";
import IconButton from "../core/IconButton";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ handleClick }) => {
  return (
    <IconButton
      handleClick={handleClick}
      icon={FaTrash}
      className="delete-button"
    />
  );
};

DeleteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DeleteButton;
