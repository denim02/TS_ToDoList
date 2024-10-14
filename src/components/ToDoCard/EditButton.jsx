import PropTypes from "prop-types";
import IconButton from "../core/IconButton";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ handleClick }) => {
  return (
    <IconButton
      handleClick={handleClick}
      icon={FaEdit}
      className="edit-button"
    />
  );
};

EditButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default EditButton;
