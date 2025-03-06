// Button.jsx
import styles from "../styles/Button.module.css";
import PropTypes from "prop-types";

const Button = ({ text }) => {
  return <button className={styles.button}>{text}</button>;
};

Button.propTypes = {
    text: PropTypes.string.isRequired, 
}

export default Button;

