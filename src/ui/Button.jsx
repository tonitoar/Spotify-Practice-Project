import styles from "../styles/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text, onClick, type = "button", className = "", style = {} }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      type={type}
      style={style} // Accept inline styles
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string, // Allow className for extra styles
  style: PropTypes.object, // Allow inline styles
};

export default Button;
