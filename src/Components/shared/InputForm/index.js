import React from "react";
import styles from "./inputForm.module.css";

const InputForm = ({
  label,
  required,
  onblur,
  onfocus,
  defaultValue,
  disabled,
  inputShow,
}) => {
  if (disabled === "false") {
    disabled = false;
  } else if (disabled === "true") {
    disabled = true;
  } else {
    disabled = false;
  }
  if (inputShow === "false") {
    inputShow = false;
  } else {
    inputShow = true;
  }
  if (!inputShow) {
    return null;
  } else {
    return (
      <div className={styles.inputForm}>
        <label>{label}</label>
        <input
          required={required}
          onBlur={onblur}
          onFocus={onfocus}
          defaultValue={defaultValue}
          disabled={disabled}
        ></input>
      </div>
    );
  }
};

export default InputForm;
