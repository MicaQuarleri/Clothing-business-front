import React from "react";
import styles from "./inputSearch.module.css";

const InputSearch = ({ label, onChange, value, onFocus }) => {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <input onChange={onChange} value={value} onFocus={onFocus}></input>
    </div>
  );
};

export default InputSearch;
