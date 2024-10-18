import PropTypes from "prop-types";
import { memo } from "react";

const TodoStats = ({ completed, remaining }) => {
  return (
    <div className="todo-stats">
      <h4>Completed: {completed}</h4>
      <h4>Remaining: {remaining}</h4>
    </div>
  );
};

TodoStats.propTypes = {
  completed: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default memo(TodoStats);
