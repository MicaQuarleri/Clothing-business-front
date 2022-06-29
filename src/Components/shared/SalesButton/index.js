import React from "react";
import styles from "./salesButton.module.css";

const SalesButton = ({ value, disabled, onClick }) => {
  return (
    <button
      className={styles.salesButton}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default SalesButton;
