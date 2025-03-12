import styles from "../styles/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
